import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the product name in the top bar", () => {
  render(<App />);
  expect(screen.getByText(/UI Effects/i)).toBeInTheDocument();
});
