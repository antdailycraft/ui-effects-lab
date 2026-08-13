import React, { createContext, useContext, useReducer } from "react";
import type { Params, ParamValue, PreviewType } from "../types/effects";
import { defaultParams, getEffect, EFFECTS } from "../registry/effects";
import { randomizeParams } from "../lib/randomize";
import { loadTheme, loadLastEffectId } from "../lib/storage";

export interface PlaygroundState {
  effectId: string;
  previewType: PreviewType;
  compare: boolean;
  animate: boolean;
  codeTab: "svg" | "css";
  theme: "dark" | "light";
  search: string;
  params: Params;
}

export type Action =
  | { type: "SELECT_EFFECT"; id: string }
  | { type: "SET_PARAM"; id: string; value: ParamValue }
  | { type: "SET_PREVIEW"; preview: PreviewType }
  | { type: "TOGGLE_COMPARE" }
  | { type: "SET_ANIMATE"; value: boolean }
  | { type: "RESET" }
  | { type: "RANDOMIZE" }
  | { type: "SET_SEARCH"; value: string }
  | { type: "SET_CODE_TAB"; tab: "svg" | "css" }
  | { type: "SET_THEME"; theme: "dark" | "light" };

const savedId = loadLastEffectId();
const firstId = savedId && getEffect(savedId) ? savedId : EFFECTS[0].id;

export const initialState: PlaygroundState = {
  effectId: firstId,
  previewType: "card",
  compare: false,
  animate: true,
  codeTab: "svg",
  theme: loadTheme(),
  search: "",
  params: defaultParams(getEffect(firstId)!),
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
    case "TOGGLE_COMPARE":
      return { ...state, compare: !state.compare };
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
    case "SET_THEME":
      return { ...state, theme: action.theme };
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
