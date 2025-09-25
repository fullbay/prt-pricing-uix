import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";

import LanguageSwitcher from "../components/LocalInstance/LanguageSwitcher";

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules(); // Clears module cache
});

test("render component with buttons", () => {
  render(<LanguageSwitcher />);
  const selector = screen.getByTestId("Language-selection");
  expect(selector).toBeInTheDocument();
});
