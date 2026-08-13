import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlaygroundProvider } from "../../state/PlaygroundContext";
import { PreviewCanvas } from "./PreviewCanvas";

test("compare mode renders a Before and an After cell", async () => {
  render(
    <PlaygroundProvider>
      <PreviewCanvas />
    </PlaygroundProvider>
  );
  await userEvent.click(screen.getByRole("button", { name: /before \/ after/i }));
  expect(screen.getByText(/^before$/i)).toBeInTheDocument();
  expect(screen.getByText(/^after$/i)).toBeInTheDocument();
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
