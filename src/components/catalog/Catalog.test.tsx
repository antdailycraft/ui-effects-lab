import { beforeEach, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlaygroundProvider, usePlayground } from "../../state/PlaygroundContext";
import { Catalog } from "./Catalog";

beforeEach(() => localStorage.clear());

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
  await userEvent.click(screen.getByRole("button", { name: /^Water Distortion/i }));
  expect(screen.getByTestId("eid")).toHaveTextContent("water");
});

test("search filters the list", async () => {
  render(
    <PlaygroundProvider>
      <Catalog />
    </PlaygroundProvider>
  );
  await userEvent.type(screen.getByPlaceholderText(/search/i), "water");
  expect(screen.getByRole("button", { name: /^Water Distortion/i })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /^Rough Edge/i })).not.toBeInTheDocument();
});

test("favoriting an effect surfaces a Favorites group", async () => {
  render(
    <PlaygroundProvider>
      <Catalog />
    </PlaygroundProvider>
  );
  expect(screen.queryByText("★ Favorites")).toBeNull();
  await userEvent.click(screen.getByRole("button", { name: /^Favorite Rough Edge$/i }));
  expect(screen.getByText("★ Favorites")).toBeInTheDocument();
  // now favorited in both the Favorites group and its category
  expect(screen.getAllByRole("button", { name: /^Unfavorite Rough Edge$/i }).length).toBe(2);
});
