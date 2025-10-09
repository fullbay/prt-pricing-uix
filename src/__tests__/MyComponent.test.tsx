import MyComponent from "@src/components/MyComponent";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";

// Mock the Stytch session hook
vi.mock("@src/hooks/auth/useStytchSession", () => ({
  useStytchSession: () => ({
    loading: false,
    isValid: true,
    sessionJWT: "mock-jwt-token",
    session: {},
    stytch: {},
    logout: vi.fn(),
  }),
}));

// Mock the GraphQL client to avoid actual API calls
vi.mock("@src/lib/graphql-client", () => ({
  graphqlClient: {
    request: vi.fn().mockResolvedValue({
      listPartPricingScales: [],
    }),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules(); // Clears module cache
});

test("renders MyComponent", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <MyComponent />
    </QueryClientProvider>
  );
  const element = screen.getByTestId("partsPricingScales");
  expect(element).toBeInTheDocument();
});
