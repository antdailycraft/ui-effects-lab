import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReferenceMenu } from "./ReferenceMenu";

test("Reference menu opens the CSS Cursors tool in a focus-trapped dialog", async () => {
  render(<ReferenceMenu />);
  // menu closed initially
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();

  await userEvent.click(screen.getByRole("button", { name: /reference/i }));
  const item = screen.getByRole("menuitem", { name: /css cursors/i });
  await userEvent.click(item);

  const dialog = screen.getByRole("dialog", { name: /css cursors/i });
  // a known cursor tile is present and copyable
  expect(within(dialog).getByRole("button", { name: /pointer/i })).toBeInTheDocument();
  expect(within(dialog).getByRole("button", { name: /not-allowed/i })).toBeInTheDocument();

  // Escape closes the dialog
  await userEvent.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("Reference menu opens the UI/UX Terms glossary with search & category filter", async () => {
  render(<ReferenceMenu />);
  await userEvent.click(screen.getByRole("button", { name: /reference/i }));
  await userEvent.click(screen.getByRole("menuitem", { name: /ui\/ux terms/i }));

  const dialog = screen.getByRole("dialog", { name: /ui\/ux terms/i });
  expect(within(dialog).getByText("Toast")).toBeInTheDocument();
  // Component terms render a live mini-preview
  expect(dialog.querySelectorAll(".cp-frame").length).toBeGreaterThan(0);

  // search narrows the list
  await userEvent.type(within(dialog).getByLabelText(/search terms/i), "fitts");
  expect(within(dialog).getByText("Fitts's Law")).toBeInTheDocument();
  expect(within(dialog).queryByText("Toast")).not.toBeInTheDocument();
});

test("Reference menu links to the Three.js showcase in a new tab", async () => {
  render(<ReferenceMenu />);
  await userEvent.click(screen.getByRole("button", { name: /reference/i }));
  const link = screen.getByRole("menuitem", { name: /dissolve/i });
  expect(link).toHaveAttribute("href", expect.stringContaining("showcase/dissolve.html"));
  expect(link).toHaveAttribute("target", "_blank");
});

test("clicking a cursor tile copies its declaration", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { clipboard: { writeText } });
  render(<ReferenceMenu />);
  await userEvent.click(screen.getByRole("button", { name: /reference/i }));
  await userEvent.click(screen.getByRole("menuitem", { name: /css cursors/i }));
  // "Draggable (idle)" is the grab tile's unique note (grab vs grabbing)
  await userEvent.click(screen.getByRole("button", { name: /draggable \(idle\)/i }));
  expect(writeText).toHaveBeenCalledWith("cursor: grab;");
});
