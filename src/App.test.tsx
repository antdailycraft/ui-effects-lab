import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("opens on the landing page with an Open the Lab CTA", () => {
  render(<App />);
  expect(screen.getAllByRole("button", { name: /open the lab/i }).length).toBeGreaterThan(0);
});

test("entering the lab reveals the workspace", async () => {
  render(<App />);
  await userEvent.click(screen.getAllByRole("button", { name: /open the lab/i })[0]);
  expect(screen.getByPlaceholderText(/search effects/i)).toBeInTheDocument();
});
