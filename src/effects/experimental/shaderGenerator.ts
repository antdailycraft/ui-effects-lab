import type { ControlDefinition, EffectDefinition, Params } from "../../types/effects";

/**
 * Builds a generator EffectDefinition wrapping a @paper-design/shaders component.
 * The component's own preset `base` params are spread first (colors etc.), then
 * the exposed control `props` override them. `speed` is zeroed when not animating.
 */
export function shaderGenerator(config: {
  id: string;
  name: string;
  componentName: string;
  description: string;
  component: unknown;
  base: Record<string, unknown>;
  tags?: string[];
  controls: ControlDefinition[];
  /** param ids forwarded to the component as props (include "speed" for animation) */
  props: string[];
  /** defaults to true; set false for shaders with no time/speed uniform */
  animatable?: boolean;
  /** true when the shader takes a source `image` (injected by the preview) */
  usesImage?: boolean;
}): EffectDefinition {
  const forward = (p: Params, animate: boolean): Record<string, unknown> => {
    const out: Record<string, unknown> = {};
    for (const key of config.props) {
      out[key] = key === "speed" ? (animate ? (p.speed as number) : 0) : p[key];
    }
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
    previewTypes: ["card"],
    controls: config.controls,
    component: config.component as EffectDefinition["component"],
    buildProps: (p, animate) => ({
      ...config.base,
      style: { width: "100%", height: "100%" },
      ...forward(p, animate),
    }),
    buildReact: (p, animate) => {
      const lines = config.props.map((key) => {
        const v = key === "speed" ? (animate ? (p.speed as number) : 0) : p[key];
        return `  ${key}={${v}}`;
      });
      if (config.usesImage) lines.unshift(`  image="/your-image.jpg"`);
      return `import { ${config.componentName} } from "@paper-design/shaders-react";

<${config.componentName}
  style={{ width: "100%", height: "100%" }}
${lines.join("\n")}
/>`;
    },
  };
}
