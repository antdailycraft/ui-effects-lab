import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmojiModal } from "./EmojiModal";

test("emoji picker filters, selects on click, and copies via the Copy button", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { clipboard: { writeText } });

  render(<EmojiModal onClose={() => {}} />);
  await userEvent.type(screen.getByLabelText(/search emoji/i), "pizza");

  // Copy is disabled until something is selected.
  const copyBtn = screen.getByRole("button", { name: /^copy$/i });
  expect(copyBtn).toBeDisabled();

  // Clicking a cell selects it (does not copy).
  const cell = await screen.findByRole("button", { name: /^pizza$/i });
  await userEvent.click(cell);
  expect(writeText).not.toHaveBeenCalled();
  expect(cell).toHaveAttribute("aria-pressed", "true");

  // The explicit Copy button writes the selected character to the clipboard.
  await userEvent.click(screen.getByRole("button", { name: /copy pizza/i }));
  expect(writeText).toHaveBeenCalledTimes(1);
  expect(writeText.mock.calls[0][0]).toBeTruthy();
});
