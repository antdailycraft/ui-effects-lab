import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlaygroundProvider } from "../../state/PlaygroundContext";
import { PreviewCanvas } from "./PreviewCanvas";

test("Split compare mode renders a Before and an After cell", async () => {
  render(
    <PlaygroundProvider>
      <PreviewCanvas />
    </PlaygroundProvider>
  );
  await userEvent.click(screen.getByRole("button", { name: /^split$/i }));
  expect(screen.getByText(/^before$/i)).toBeInTheDocument();
  expect(screen.getByText(/^after$/i)).toBeInTheDocument();
});

test("Slider compare mode renders a draggable split handle", async () => {
  render(
    <PlaygroundProvider>
      <PreviewCanvas />
    </PlaygroundProvider>
  );
  await userEvent.click(screen.getByRole("button", { name: /^slider$/i }));
  expect(screen.getByRole("slider", { name: /comparison split/i })).toBeInTheDocument();
});

test("the active preview target button exposes aria-pressed", async () => {
  render(
    <PlaygroundProvider>
      <PreviewCanvas />
    </PlaygroundProvider>
  );
  const buttonTarget = screen.getByRole("button", { name: /^button$/i });
  expect(buttonTarget).toHaveAttribute("aria-pressed", "false");
  await userEvent.click(buttonTarget);
  expect(buttonTarget).toHaveAttribute("aria-pressed", "true");
});

test("Fullscreen button toggles the immersive preview overlay", async () => {
  const { container } = render(
    <PlaygroundProvider>
      <PreviewCanvas />
    </PlaygroundProvider>
  );
  expect(container.querySelector(".pv-fullscreen")).toBeNull();
  await userEvent.click(screen.getByRole("button", { name: /enter fullscreen/i }));
  expect(container.querySelector(".pv-fullscreen")).not.toBeNull();
});

test("switching preview type to Text shows the text target", async () => {
  render(
    <PlaygroundProvider>
      <PreviewCanvas />
    </PlaygroundProvider>
  );
  await userEvent.click(screen.getByRole("button", { name: /^text$/i }));
  expect(screen.getByText(/turbulence/i)).toBeInTheDocument();
});

test("Button preview target renders CTA buttons", async () => {
  render(
    <PlaygroundProvider>
      <PreviewCanvas />
    </PlaygroundProvider>
  );
  await userEvent.click(screen.getByRole("button", { name: /^button$/i }));
  expect(screen.getByRole("button", { name: /get started/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /read the docs/i })).toBeInTheDocument();
});

test("Newspaper preview target renders the broadsheet masthead", async () => {
  render(
    <PlaygroundProvider>
      <PreviewCanvas />
    </PlaygroundProvider>
  );
  await userEvent.click(screen.getByRole("button", { name: /^newspaper$/i }));
  expect(screen.getByText(/the daily turbulence/i)).toBeInTheDocument();
  expect(screen.getByText(/filters reshape the front page/i)).toBeInTheDocument();
});

test("Custom preview target shows a markup editor and renders it live", async () => {
  render(
    <PlaygroundProvider>
      <PreviewCanvas />
    </PlaygroundProvider>
  );
  await userEvent.click(screen.getByRole("button", { name: /^custom$/i }));
  const editor = screen.getByLabelText(/custom html markup/i);
  expect(editor).toBeInTheDocument();
  await userEvent.clear(editor);
  await userEvent.type(editor, "<h4>Hello Custom</h4>");
  expect(screen.getByText("Hello Custom")).toBeInTheDocument();
});
