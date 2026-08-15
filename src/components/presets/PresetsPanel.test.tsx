import { beforeEach, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlaygroundProvider, usePlayground } from "../../state/PlaygroundContext";
import { ControlsPanel } from "../controls/ControlsPanel";

beforeEach(() => localStorage.clear());

function ScaleProbe() {
  const { state } = usePlayground();
  return <span data-testid="scale">{String(state.params.scale)}</span>;
}

function setup() {
  return render(
    <PlaygroundProvider>
      <ControlsPanel />
      <ScaleProbe />
    </PlaygroundProvider>
  );
}

test("saving captures the current params; loading restores them", async () => {
  setup();
  const slider = screen.getByLabelText(/displacement scale/i) as HTMLInputElement;

  // tune, then save a named preset that captures scale = 25
  fireEvent.input(slider, { target: { value: "25" } });
  await userEvent.type(screen.getByLabelText(/preset name/i), "Crisp");
  await userEvent.click(screen.getByRole("button", { name: /^save$/i }));
  expect(screen.getByRole("button", { name: /^Crisp$/ })).toBeInTheDocument();

  // change the value, then load the preset to restore it
  fireEvent.input(slider, { target: { value: "40" } });
  expect(screen.getByTestId("scale")).toHaveTextContent("40");
  await userEvent.click(screen.getByRole("button", { name: /^Crisp$/ }));
  expect(screen.getByTestId("scale")).toHaveTextContent("25");
});

test("deleting removes the preset", async () => {
  setup();
  await userEvent.type(screen.getByLabelText(/preset name/i), "Temp");
  await userEvent.click(screen.getByRole("button", { name: /^save$/i }));
  expect(screen.getByRole("button", { name: /^Temp$/ })).toBeInTheDocument();

  await userEvent.click(screen.getByLabelText(/delete preset Temp/i));
  expect(screen.queryByRole("button", { name: /^Temp$/ })).not.toBeInTheDocument();
});

test("shows an empty state until a preset is saved", async () => {
  setup();
  expect(screen.getByText(/no presets for this effect/i)).toBeInTheDocument();
  await userEvent.type(screen.getByLabelText(/preset name/i), "First");
  await userEvent.click(screen.getByRole("button", { name: /^save$/i }));
  expect(screen.queryByText(/no presets for this effect/i)).not.toBeInTheDocument();
});
