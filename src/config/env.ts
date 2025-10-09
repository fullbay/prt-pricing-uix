function getRequiredEnvVar(name: string): string {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is required but not set`);
  }
  return value;
}

export const env = {
  GRAPHQL_ENDPOINT: getRequiredEnvVar("VITE_GRAPHQL_ENDPOINT"),
  ACCOUNT_ID: getRequiredEnvVar("VITE_ACCOUNT_ID"),
} as const;
