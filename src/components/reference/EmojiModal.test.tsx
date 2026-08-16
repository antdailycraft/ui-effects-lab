import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmojiModal } from "./EmojiModal";

test("emoji picker filters by search and copies the character on click", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { clipboard: { writeText } });

  render(<EmojiModal onClose={() => {}} />);
  await userEvent.type(screen.getByLabelText(/search emoji/i), "pizza");

  const cell = await screen.findByRole("button", { name: /^pizza$/i });
  await userEvent.click(cell);
  expect(writeText).toHaveBeenCalledTimes(1);
  expect(writeText.mock.calls[0][0]).toBeTruthy(); // the emoji character
});
