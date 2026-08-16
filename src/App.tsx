import { useState } from "react";
import { PlaygroundProvider } from "./state/PlaygroundContext";
import { ViewProvider } from "./state/ViewContext";
import { AppShell } from "./components/layout/AppShell";
import { Catalog } from "./components/catalog/Catalog";
import { PreviewCanvas } from "./components/preview/PreviewCanvas";
import { ControlsPanel } from "./components/controls/ControlsPanel";
import { Landing } from "./components/landing/Landing";

function Workspace({ onHome }: { onHome: () => void }) {
  return (
    <ViewProvider value={{ goHome: onHome }}>
      <AppShell>
        <Catalog />
        <PreviewCanvas />
        <ControlsPanel />
      </AppShell>
    </ViewProvider>
  );
}

function Root() {
  // Show the landing first, unless a share link (#s=…) deep-links into an effect.
  const [landing, setLanding] = useState(
    () => typeof location === "undefined" || !location.hash.startsWith("#s=")
  );
  return landing ? (
    <Landing onEnter={() => setLanding(false)} />
  ) : (
    <Workspace onHome={() => setLanding(true)} />
  );
}

export default function App() {
  return (
    <PlaygroundProvider>
      <Root />
    </PlaygroundProvider>
  );
}
