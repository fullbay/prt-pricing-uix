function getRequiredEnvVar(name: string, fallback?: string): string {
  const value = import.meta.env[name] || fallback;
  if (!value) {
    throw new Error(`Environment variable ${name} is required but not set`);
  }
  return value;
}

export const env = {
  GRAPHQL_ENDPOINT: getRequiredEnvVar(
    "VITE_GRAPHQL_ENDPOINT",
    "https://lsmkwymmazaullepkxk7jnfy3e.appsync-api.us-west-2.amazonaws.com/graphql"
  ),
  ACCOUNT_ID: getRequiredEnvVar("VITE_ACCOUNT_ID"),
} as const;
