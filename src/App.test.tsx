import { beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
  localStorage.clear();
  document.documentElement.lang = "en";
});

test("opens on the landing page with an Open the Lab CTA", () => {
  render(<App />);
  expect(screen.getAllByRole("button", { name: /open the lab/i }).length).toBeGreaterThan(0);
});

test("entering the lab reveals the workspace", async () => {
  render(<App />);
  await userEvent.click(screen.getAllByRole("button", { name: /open the lab/i })[0]);
  expect(screen.getByPlaceholderText(/search effects/i)).toBeInTheDocument();
});

test("switches to Korean and persists the language choice", async () => {
  render(<App />);
  await userEvent.click(screen.getByRole("button", { name: /switch to korean/i }));

  expect(screen.getAllByRole("button", { name: /실험실 열기/i }).length).toBeGreaterThan(0);
  expect(document.documentElement).toHaveAttribute("lang", "ko");
  expect(localStorage.getItem("ui-effects-lab:locale")).toBe("ko");
});
