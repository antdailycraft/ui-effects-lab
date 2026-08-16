import React, { createContext, useContext, useReducer } from "react";
import type { Params, ParamValue, PreviewType } from "../types/effects";
import { defaultParams, getEffect, EFFECTS } from "../registry/effects";
import { randomizeParams } from "../lib/randomize";
import { loadTheme, loadLastEffectId, loadCustomHtml } from "../lib/storage";
import { DEFAULT_IMAGE } from "../lib/sampleImage";
import { decodeShare } from "../lib/share";
import type { EffectLayer } from "../lib/combine";
import { isStackable, MAX_LAYERS } from "../lib/combine";

export type CompareMode = "off" | "side-by-side" | "slider";

export interface PlaygroundState {
  effectId: string;
  previewType: PreviewType;
  compareMode: CompareMode;
  fullscreen: boolean;
  animate: boolean;
  codeTab: "svg" | "css" | "react";
  theme: "dark" | "light";
  search: string;
  params: Params;
  /** Source image (URL / data URI) for image-based generators. */
  imageUrl: string;
  /** User-authored markup for the "custom" preview target. */
  customHtml: string;
  /** Committed SVG-filter effects stacked under the active one (Combine). */
  layers: EffectLayer[];
}

export type Action =
  | { type: "SELECT_EFFECT"; id: string }
  | { type: "SET_PARAM"; id: string; value: ParamValue }
  | { type: "SET_PREVIEW"; preview: PreviewType }
  | { type: "SET_COMPARE_MODE"; mode: CompareMode }
  | { type: "TOGGLE_FULLSCREEN" }
  | { type: "SET_FULLSCREEN"; value: boolean }
  | { type: "SET_ANIMATE"; value: boolean }
  | { type: "RESET" }
  | { type: "RANDOMIZE" }
  | { type: "SET_SEARCH"; value: string }
  | { type: "SET_CODE_TAB"; tab: "svg" | "css" | "react" }
  | { type: "SET_THEME"; theme: "dark" | "light" }
  | { type: "LOAD_PRESET"; effectId: string; params: Params }
  | { type: "SET_IMAGE"; url: string }
  | { type: "SET_CUSTOM_HTML"; html: string }
  | { type: "ADD_LAYER" }
  | { type: "REMOVE_LAYER"; index: number }
  | { type: "MOVE_LAYER"; index: number; dir: -1 | 1 }
  | { type: "CLEAR_LAYERS" };

// A shared "#s=…" link (if present and valid) wins over the last-used effect.
const shared = typeof location !== "undefined" ? decodeShare(location.hash) : null;
const sharedEffect = shared && getEffect(shared.e) ? getEffect(shared.e)! : null;

const savedId = loadLastEffectId();
const firstId = sharedEffect
  ? sharedEffect.id
  : savedId && getEffect(savedId)
    ? savedId
    : EFFECTS[0].id;

export const initialState: PlaygroundState = {
  effectId: firstId,
  previewType: sharedEffect && shared?.pv ? shared.pv : "card",
  compareMode: "off",
  fullscreen: false,
  animate: true,
  codeTab: "svg",
  theme: loadTheme(),
  search: "",
  params: sharedEffect
    ? { ...defaultParams(sharedEffect), ...shared!.p }
    : defaultParams(getEffect(firstId)!),
  imageUrl: DEFAULT_IMAGE,
  customHtml: loadCustomHtml(),
  layers:
    shared?.l
      ?.map((x) => ({ effectId: x.e, params: x.p }))
      .filter((l) => {
        const e = getEffect(l.effectId);
        return e && isStackable(e);
      }) ?? [],
};

export function reducer(state: PlaygroundState, action: Action): PlaygroundState {
  switch (action.type) {
    case "SELECT_EFFECT": {
      const effect = getEffect(action.id);
      if (!effect) return state;
      return { ...state, effectId: action.id, params: defaultParams(effect) };
    }
    case "SET_PARAM":
      return { ...state, params: { ...state.params, [action.id]: action.value } };
    case "SET_PREVIEW":
      return { ...state, previewType: action.preview };
    case "SET_COMPARE_MODE":
      return { ...state, compareMode: action.mode };
    case "TOGGLE_FULLSCREEN":
      return { ...state, fullscreen: !state.fullscreen };
    case "SET_FULLSCREEN":
      return { ...state, fullscreen: action.value };
    case "SET_ANIMATE":
      return { ...state, animate: action.value };
    case "RESET":
      return { ...state, params: defaultParams(getEffect(state.effectId)!) };
    case "RANDOMIZE":
      return { ...state, params: randomizeParams(getEffect(state.effectId)!) };
    case "SET_SEARCH":
      return { ...state, search: action.value };
    case "SET_CODE_TAB":
      return { ...state, codeTab: action.tab };
    case "SET_IMAGE":
      return { ...state, imageUrl: action.url };
    case "SET_CUSTOM_HTML":
      return { ...state, customHtml: action.html };
    case "ADD_LAYER": {
      const effect = getEffect(state.effectId);
      if (!effect || !isStackable(effect) || state.layers.length >= MAX_LAYERS) return state;
      return {
        ...state,
        layers: [...state.layers, { effectId: state.effectId, params: { ...state.params } }],
      };
    }
    case "REMOVE_LAYER":
      return { ...state, layers: state.layers.filter((_, i) => i !== action.index) };
    case "MOVE_LAYER": {
      const to = action.index + action.dir;
      if (to < 0 || to >= state.layers.length) return state;
      const layers = [...state.layers];
      [layers[action.index], layers[to]] = [layers[to], layers[action.index]];
      return { ...state, layers };
    }
    case "CLEAR_LAYERS":
      return { ...state, layers: [] };
    case "SET_THEME":
      return { ...state, theme: action.theme };
    case "LOAD_PRESET": {
      const effect = getEffect(action.effectId);
      if (!effect) return state;
      return {
        ...state,
        effectId: action.effectId,
        params: { ...defaultParams(effect), ...action.params },
      };
    }
    default:
      return state;
  }
}

const Ctx = createContext<{ state: PlaygroundState; dispatch: React.Dispatch<Action> } | null>(null);

export function PlaygroundProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>;
}

export function usePlayground() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePlayground must be used within PlaygroundProvider");
  return ctx;
}
