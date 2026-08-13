export type EffectCategory = "svg-filter" | "css" | "retro" | "experimental";
export type PreviewType = "card" | "text" | "image";
export type ControlType = "range" | "seed" | "toggle";
export type ParamValue = number | boolean;
export type Params = Record<string, ParamValue>;

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
  previewTypes: PreviewType[];
  controls: ControlDefinition[];
  /** Builds the inner markup of the <filter> given params + whether animation is active. */
  buildFilterInner: (params: Params, animate: boolean) => string;
}
