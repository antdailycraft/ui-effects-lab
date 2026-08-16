import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the product name as the page heading", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /ui effects lab/i })).toBeInTheDocument();
});
