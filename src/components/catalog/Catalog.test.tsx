import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlaygroundProvider, usePlayground } from "../../state/PlaygroundContext";
import { Catalog } from "./Catalog";

function EffectProbe() {
  const { state } = usePlayground();
  return <span data-testid="eid">{state.effectId}</span>;
}

test("selecting an effect updates state", async () => {
  render(
    <PlaygroundProvider>
      <Catalog />
      <EffectProbe />
    </PlaygroundProvider>
  );
  await userEvent.click(screen.getByRole("button", { name: /Water Distortion/i }));
  expect(screen.getByTestId("eid")).toHaveTextContent("water");
});

test("search filters the list", async () => {
  render(
    <PlaygroundProvider>
      <Catalog />
    </PlaygroundProvider>
  );
  await userEvent.type(screen.getByPlaceholderText(/search/i), "water");
  expect(screen.getByRole("button", { name: /Water Distortion/i })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /Rough Edge/i })).not.toBeInTheDocument();
});
