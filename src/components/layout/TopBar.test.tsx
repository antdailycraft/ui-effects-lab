import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlaygroundProvider, usePlayground } from "../../state/PlaygroundContext";
import { TopBar } from "./TopBar";

function ThemeProbe() {
  const { state } = usePlayground();
  return <span data-testid="theme">{state.theme}</span>;
}

test("theme toggle flips the theme", async () => {
  render(
    <PlaygroundProvider>
      <TopBar />
      <ThemeProbe />
    </PlaygroundProvider>
  );
  const before = screen.getByTestId("theme").textContent;
  await userEvent.click(screen.getByLabelText(/toggle theme/i));
  expect(screen.getByTestId("theme").textContent).not.toBe(before);
});

test("exposes a Resources menu trigger", () => {
  render(
    <PlaygroundProvider>
      <TopBar />
    </PlaygroundProvider>
  );
  expect(screen.getByRole("button", { name: /resources/i })).toBeInTheDocument();
});
