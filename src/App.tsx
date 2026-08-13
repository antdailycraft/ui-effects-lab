import { PlaygroundProvider } from "./state/PlaygroundContext";
import { AppShell } from "./components/layout/AppShell";
import { Catalog } from "./components/catalog/Catalog";
import { PreviewCanvas } from "./components/preview/PreviewCanvas";
import { ControlsPanel } from "./components/controls/ControlsPanel";

export default function App() {
  return (
    <PlaygroundProvider>
      <AppShell>
        <Catalog />
        <PreviewCanvas />
        <ControlsPanel />
      </AppShell>
    </PlaygroundProvider>
  );
}
