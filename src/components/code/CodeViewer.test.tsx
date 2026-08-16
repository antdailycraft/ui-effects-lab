import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlaygroundProvider } from "../../state/PlaygroundContext";
import { CodeViewer } from "./CodeViewer";

test("copy writes the SVG code to the clipboard", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { clipboard: { writeText } });
  render(
    <PlaygroundProvider>
      <CodeViewer />
    </PlaygroundProvider>
  );
  await userEvent.click(screen.getByRole("button", { name: /copy/i }));
  expect(writeText).toHaveBeenCalledWith(expect.stringContaining('<filter id="rough-edge">'));
});

test("switching to the CSS tab shows the css rule", async () => {
  render(
    <PlaygroundProvider>
      <CodeViewer />
    </PlaygroundProvider>
  );
  await userEvent.click(screen.getByRole("button", { name: /^css$/i }));
  // the rule is syntax-highlighted into multiple spans, so assert on the <pre> text
  const pre = document.querySelector(".code-pre")!;
  expect(pre.textContent).toContain("url(#rough-edge)");
});

test("Expand opens a modal with the full code, its own Copy, and closes", async () => {
  render(
    <PlaygroundProvider>
      <CodeViewer />
    </PlaygroundProvider>
  );
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  const expand = screen.getByRole("button", { name: /expand code/i });
  await userEvent.click(expand);
  const dialog = screen.getByRole("dialog");
  expect(within(dialog).getByText(/rough-edge/)).toBeInTheDocument();
  expect(within(dialog).getByRole("button", { name: /copy/i })).toBeInTheDocument();
  // focus moved into the dialog on open
  expect(dialog.contains(document.activeElement)).toBe(true);

  await userEvent.click(within(dialog).getByRole("button", { name: /close/i }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  // focus restored to the trigger on close
  expect(document.activeElement).toBe(expand);
});
