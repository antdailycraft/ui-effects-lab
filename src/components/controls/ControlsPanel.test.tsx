import { render, screen, fireEvent } from "@testing-library/react";
import { PlaygroundProvider, usePlayground } from "../../state/PlaygroundContext";
import { ControlsPanel } from "./ControlsPanel";

function ParamProbe({ id }: { id: string }) {
  const { state } = usePlayground();
  return <span data-testid="p">{String(state.params[id])}</span>;
}

test("dragging a range updates the matching parameter", () => {
  render(
    <PlaygroundProvider>
      <ControlsPanel />
      <ParamProbe id="scale" />
    </PlaygroundProvider>
  );
  const slider = screen.getByLabelText(/displacement scale/i) as HTMLInputElement;
  fireEvent.input(slider, { target: { value: "25" } });
  expect(screen.getByTestId("p")).toHaveTextContent("25");
});

test("renders the current effect name", () => {
  render(
    <PlaygroundProvider>
      <ControlsPanel />
    </PlaygroundProvider>
  );
  expect(screen.getByText(/rough edge/i)).toBeInTheDocument();
});

test("shows a license badge linking to the SPDX page (defaults to MIT)", () => {
  render(
    <PlaygroundProvider>
      <ControlsPanel />
    </PlaygroundProvider>
  );
  const badge = screen.getByRole("link", { name: /MIT/i });
  expect(badge).toHaveAttribute("href", "https://spdx.org/licenses/MIT.html");
  expect(badge).toHaveAttribute("target", "_blank");
});
