import { render, screen } from "@testing-library/react";
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
  expect(screen.getByText(/url\(#rough-edge\)/)).toBeInTheDocument();
});
