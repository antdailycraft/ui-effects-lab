import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlaygroundProvider, usePlayground } from "../../state/PlaygroundContext";
import { TopBar } from "../layout/TopBar";

function EffectProbe() {
  const { state } = usePlayground();
  return <span data-testid="eid">{state.effectId}</span>;
}

test("Gallery shows SVG filters at defaults and a tile opens that effect", async () => {
  render(
    <PlaygroundProvider>
      <TopBar />
      <EffectProbe />
    </PlaygroundProvider>
  );

  await userEvent.click(screen.getByRole("button", { name: /gallery/i }));
  const dialog = screen.getByRole("dialog", { name: /effect gallery/i });
  // multiple filter tiles rendered
  expect(within(dialog).getByRole("button", { name: /water distortion/i })).toBeInTheDocument();

  await userEvent.click(within(dialog).getByRole("button", { name: /water distortion/i }));
  expect(screen.getByTestId("eid")).toHaveTextContent("water");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
