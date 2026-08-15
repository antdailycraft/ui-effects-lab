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
