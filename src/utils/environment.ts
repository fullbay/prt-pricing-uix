/**
 * Utility functions for environment detection and configuration
 */

export type Environment = "local" | "dev" | "staging" | "prod";

/**
 * Detects the current environment based on the hostname
 * @returns The detected environment
 */
export const detectEnvironment = (): Environment => {
  const hostname = window.location.hostname;

  // Check for localhost or local development
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.includes(".local")
  ) {
    // In local development, check for VITE_ENV override, default to 'dev'
    const viteEnv = import.meta.env.VITE_ENV as string;
    if (viteEnv && ["dev", "prod", "staging"].includes(viteEnv)) {
      return viteEnv as Environment;
    }
    return "dev"; // Default to dev for local development
  }

  // Check for fullbay.com domains
  if (hostname.includes(".fullbay.com")) {
    if (hostname.includes(".dev.")) {
      return "dev";
    }
    if (hostname.includes(".staging.")) {
      return "staging";
    }
    if (
      hostname.includes(".prod.") ||
      hostname === "fullbay.com" ||
      hostname === "www.fullbay.com"
    ) {
      return "prod";
    }
  }

  // Check VITE_ENV environment variable as fallback
  const viteEnv = import.meta.env.VITE_ENV as string;
  if (viteEnv && ["dev", "local", "prod", "staging"].includes(viteEnv)) {
    return viteEnv as Environment;
  }

  // Default to dev if we can't determine
  return "dev";
};

/**
 * Gets the authentication URL for the current environment
 * @returns The full authentication URL
 */
export const getAuthUrl = (): string => {
  // First check if there's an explicit override
  const overrideUrl = import.meta.env.VITE_IDP_APP_URL as string;
  if (overrideUrl) {
    return overrideUrl;
  }

  const env = detectEnvironment();
  const hostname = window.location.hostname;

  // For local development, use localhost:3000
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.includes(".local")
  ) {
    return "http://localhost:3000";
  }

  // For all other environments, use the fullbay.com pattern
  return `https://auth.${env}.fullbay.com`;
};

/**
 * Gets the current environment
 * @returns The current environment
 */
export const getCurrentEnvironment = (): Environment => {
  return detectEnvironment();
};
