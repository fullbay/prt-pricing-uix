import { createStytchB2BUIClient } from "@stytch/react/b2b/ui";

import { detectEnvironment } from "../utils/environment";

// Get environment-specific configuration
const getStytchConfig = () => {
  const env = detectEnvironment();

  // Use environment-specific cookie domain for production environments
  let cookieDomain = window.location.hostname;
  if (env !== "local" && window.location.hostname.includes(".fullbay.com")) {
    // For fullbay.com domains, use the base domain for cookie sharing
    cookieDomain = ".fullbay.com";
  }

  return {
    publicToken:
      import.meta.env.VITE_STYTCH_PUBLIC_TOKEN ||
      "public-token-test-2ce25555-5f05-44c0-879e-7948c9ce3633",
    cookieOptions: {
      domain: import.meta.env.VITE_STYTCH_COOKIE_DOMAIN || cookieDomain,
      path: "/",
    },
  };
};

const config = getStytchConfig();

// Singleton pattern to ensure only one Stytch client exists
let stytchClient: ReturnType<typeof createStytchB2BUIClient> | null = null;

const initializeStytchClient = () => {
  if (!stytchClient) {
    console.log("Initializing Stytch client with config:", config);
    try {
      stytchClient = createStytchB2BUIClient(config.publicToken, {
        cookieOptions: config.cookieOptions,
      });
    } catch (error) {
      console.error("Error initializing Stytch client:", error);
      throw error; // Re-throw to handle it in the calling function
    }
  }
  return stytchClient;
};

// Export client for use in queryFn (outside React components)
export const getStytchClient = () => {
  return initializeStytchClient();
};
