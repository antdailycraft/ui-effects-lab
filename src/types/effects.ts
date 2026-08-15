import type { ComponentType } from "react";

export type EffectCategory = "svg-filter" | "css" | "retro" | "experimental";
export type PreviewType = "card" | "text" | "image";
export type ControlType = "range" | "seed" | "toggle" | "color";
export type ParamValue = number | boolean | string;
export type Params = Record<string, ParamValue>;

/** How an effect is applied to the preview element. */
export type EffectKind = "svg" | "css" | "generator";

export interface ControlDefinition {
  id: string;
  label: string;
  type: ControlType;
  min?: number;
  max?: number;
  step?: number;
  def: ParamValue;
  decimals?: number;
  unit?: string;
  random?: [number, number];
  isAnimationControl?: boolean;
}

export interface EffectDefinition {
  id: string;
  name: string;
  sub: string;
  category: EffectCategory;
  categoryLabel: string;
  tags: string[];
  tech: string[];
  description: string;
  animatable?: boolean;
  /** SPDX license id of the generated code. Omitted → MIT (our own implementation on open web standards). */
  license?: string;
  previewTypes: PreviewType[];
  controls: ControlDefinition[];

  /** Defaults to "svg" when omitted. */
  kind?: EffectKind;

  /** SVG kind: inner markup of the <filter>, applied via `filter: url(#id)`. */
  buildFilterInner?: (params: Params, animate: boolean) => string;

  /** CSS kind: the class toggled on the preview element (styles live in index.css). */
  cssClass?: string;
  /** CSS kind: CSS custom properties (and any inline props) derived from params. */
  buildStyle?: (params: Params, animate: boolean) => Record<string, string>;
  /** CSS kind: the resolved CSS rule shown in the code viewer. */
  buildCss?: (params: Params, animate: boolean) => string;

  /** Generator kind: a self-contained component (e.g. a WebGL shader) that IS the preview. */
  component?: ComponentType<Record<string, unknown>>;
  /** Generator kind: props passed to the component, derived from params. */
  buildProps?: (params: Params, animate: boolean) => Record<string, unknown>;
  /** Generator kind: the React usage snippet shown in the code viewer. */
  buildReact?: (params: Params, animate: boolean) => string;
  /** Generator kind: accepts a source image (an `image` URL prop is injected). */
  usesImage?: boolean;
}
