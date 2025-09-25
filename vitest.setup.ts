import * as matchers from "@testing-library/jest-dom/matchers";
import { configure } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

expect.extend(matchers);

// Configure custom test ID attribute
configure({
  testIdAttribute: "data-fb-test-id",
});

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: vi.fn(),
      language: "en",
    },
  }),
  initReactI18next: {
    type: "3rdParty",
    init: vi.fn(),
  },
}));

// Mock i18next
vi.mock("i18next", () => ({
  default: {
    use: vi.fn().mockReturnThis(),
    init: vi.fn(),
    changeLanguage: vi.fn(),
    language: "en",
  },
}));

// Mock i18next-http-backend
vi.mock("i18next-http-backend", () => ({
  default: vi.fn(),
}));

// Mock useStytchSession hook
vi.mock("@src/hooks/auth/useStytchSession", () => ({
  useStytchSession: vi.fn(() => ({
    isValid: true,
    loading: false,
    sessionJWT: "mock-jwt",
    // eslint-disable-next-line camelcase
    session: { member_id: "test-member", organization_id: "test-org" },
    stytch: {},
    logout: vi.fn(),
  })),
}));
