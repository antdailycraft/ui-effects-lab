import { useEffect, useRef } from "react";
import { usePlayground } from "../../state/PlaygroundContext";
import { saveTheme, saveCustomHtml } from "../../lib/storage";
import { TopBar } from "./TopBar";
import { BottomBar } from "./BottomBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { state } = usePlayground();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.theme);
    saveTheme(state.theme);
  }, [state.theme]);
  useEffect(() => {
    saveCustomHtml(state.customHtml);
  }, [state.customHtml]);

  // While the preview is fullscreen, make the side columns inert so keyboard
  // focus and screen readers stay within the overlay (the preview is <main>).
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    for (const child of Array.from(el.children)) {
      if (child.tagName !== "MAIN") (child as HTMLElement).inert = state.fullscreen;
    }
  }, [state.fullscreen]);

  return (
    <div className="app">
      <TopBar />
      <div className="main" ref={mainRef}>
        {children}
      </div>
      <BottomBar />
    </div>
  );
}
