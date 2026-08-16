import { useEffect } from "react";
import { usePlayground } from "../../state/PlaygroundContext";
import { saveTheme, saveCustomHtml } from "../../lib/storage";
import { TopBar } from "./TopBar";
import { BottomBar } from "./BottomBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { state } = usePlayground();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.theme);
    saveTheme(state.theme);
  }, [state.theme]);
  useEffect(() => {
    saveCustomHtml(state.customHtml);
  }, [state.customHtml]);
  return (
    <div className="app">
      <TopBar />
      <div className="main">{children}</div>
      <BottomBar />
    </div>
  );
}
