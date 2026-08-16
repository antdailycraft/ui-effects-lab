import { lazy, type ComponentType } from "react";
import type { ControlDefinition, EffectDefinition, Params } from "../../types/effects";

/**
 * Lazily loads a component from the WebGL shader library by export name, so the
 * ~270 KB library is fetched only when a generator is actually rendered (not in
 * the initial bundle). The registry stays synchronous because preset metadata
 * comes from a local snapshot (`presets.generated.ts`), not the library.
 */
function lazyShader(componentName: string): EffectDefinition["component"] {
  return lazy(async () => {
    const mod = (await import("@paper-design/shaders-react")) as Record<string, unknown>;
    return { default: mod[componentName] as ComponentType<unknown> };
  }) as unknown as EffectDefinition["component"];
}

/**
 * Builds a generator EffectDefinition wrapping a @paper-design/shaders component.
 * The library preset params (`presets[0]`) are spread first (colors etc.), then
 * the exposed control `props` override them. `speed` is zeroed when not animating.
 * Every library preset is surfaced as a read-only built-in preset.
 */
export function shaderGenerator(config: {
  id: string;
  name: string;
  componentName: string;
  description: string;
  /** the library's own preset list; presets[0] provides the base props (colors etc.) */
  presets: { name: string; params: Record<string, unknown> }[];
  tags?: string[];
  controls: ControlDefinition[];
  /** param ids forwarded to the component as props (include "speed" for animation) */
  props: string[];
  /** defaults to true; set false for shaders with no time/speed uniform */
  animatable?: boolean;
  /** true when the shader takes a source `image` (injected by the preview) */
  usesImage?: boolean;
  /** color controls whose values form the shader's `colors` array */
  colorProps?: { id: string; label: string; def: string }[];
}): EffectDefinition {
  const colorProps = config.colorProps ?? [];
  const base = config.presets[0].params;
  const ctrlById = new Map(config.controls.map((c) => [c.id, c] as const));

  const builtInPresets = config.presets.map((pr) => {
    const params: Params = {};
    for (const key of config.props) {
      const v = pr.params[key];
      if (typeof v === "number") {
        const c = ctrlById.get(key);
        let n = v;
        if (c?.min !== undefined) n = Math.max(c.min, n);
        if (c?.max !== undefined) n = Math.min(c.max, n);
        params[key] = n;
      } else if (typeof v === "boolean" || typeof v === "string") {
        params[key] = v;
      }
    }
    const cols = pr.params.colors;
    colorProps.forEach((c, i) => {
      if (Array.isArray(cols) && typeof cols[i] === "string") params[c.id] = cols[i] as string;
    });
    return { name: pr.name, params };
  });

  const forward = (p: Params, animate: boolean): Record<string, unknown> => {
    const out: Record<string, unknown> = {};
    for (const key of config.props) {
      out[key] = key === "speed" ? (animate ? (p.speed as number) : 0) : p[key];
    }
    if (colorProps.length) out.colors = colorProps.map((c) => p[c.id]);
    return out;
  };

  return {
    id: config.id,
    name: config.name,
    sub: "@paper-design/shaders",
    category: "experimental",
    categoryLabel: "Generators",
    tags: config.tags ?? ["shader", "webgl", "animation"],
    tech: ["WebGL", "@paper-design/shaders"],
    description: config.description,
    license: "Apache-2.0",
    kind: "generator",
    animatable: config.animatable ?? true,
    usesImage: config.usesImage ?? false,
    builtInPresets,
    previewTypes: ["card"],
    controls: [
      ...config.controls,
      ...colorProps.map(
        (c): ControlDefinition => ({ id: c.id, label: c.label, type: "color", def: c.def })
      ),
    ],
    component: lazyShader(config.componentName),
    buildProps: (p, animate) => ({
      ...base,
      style: { width: "100%", height: "100%" },
      ...forward(p, animate),
    }),
    buildReact: (p, animate) => {
      const lines = config.props.map((key) => {
        const v = key === "speed" ? (animate ? (p.speed as number) : 0) : p[key];
        return `  ${key}={${v}}`;
      });
      if (colorProps.length) {
        const cols = colorProps.map((c) => `"${p[c.id]}"`).join(", ");
        lines.push(`  colors={[${cols}]}`);
      }
      if (config.usesImage) lines.unshift(`  image="/your-image.jpg"`);
      return `import { ${config.componentName} } from "@paper-design/shaders-react";

<${config.componentName}
  style={{ width: "100%", height: "100%" }}
${lines.join("\n")}
/>`;
    },
  };
}
