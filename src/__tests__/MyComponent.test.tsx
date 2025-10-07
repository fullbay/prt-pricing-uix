import MyComponent from "@src/components/MyComponent";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules(); // Clears module cache
});

test("renders MyComponent", () => {
  render(<MyComponent />);
  const element = screen.getByTestId("partsPricingScales");
  expect(element).toBeInTheDocument();
});
