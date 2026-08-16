import { createContext, useContext } from "react";

/** App-level view navigation (workspace ⇄ landing), kept out of PlaygroundState. */
export interface ViewNav {
  /** Return to the landing page. */
  goHome: () => void;
}

const Ctx = createContext<ViewNav | null>(null);

export const ViewProvider = Ctx.Provider;

export function useViewNav(): ViewNav {
  return useContext(Ctx) ?? { goHome: () => {} };
}
