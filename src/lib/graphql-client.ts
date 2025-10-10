import { DocumentNode, print } from "graphql";

import { getStytchClient } from "./stytchClient";

const API_URL =
  import.meta.env.VITE_GRAPHQL_ENDPOINT ||
  "https://lsmkwymmazaullepkxk7jnfy3e.appsync-api.us-west-2.amazonaws.com/graphql";

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: string[];
    extensions?: Record<string, unknown>;
  }>;
};

async function getFreshStytchJWT(): Promise<string> {
  const stytchClient = getStytchClient();
  const tokens = stytchClient.session.getTokens();
  let jwt = tokens?.session_jwt ?? null;

  // If no JWT in tokens, try to authenticate
  if (!jwt) {
    const cachedSession = stytchClient.session.getSync();
    if (!cachedSession) {
      const sessionData = await stytchClient.session.authenticate();
      if (sessionData && sessionData.member_session) {
        jwt = sessionData.session_jwt;
      }
    }
  }

  if (!jwt) {
    throw new Error("No valid Stytch session");
  }

  return jwt;
}

export const graphqlClient = {
  async request<T = unknown, V = Record<string, unknown>>(
    query: string | DocumentNode,
    variables?: V
  ): Promise<T> {
    const jwt = await getFreshStytchJWT();

    // Convert DocumentNode to string if needed
    const queryString = typeof query === "string" ? query : print(query);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: jwt,
        },
        body: JSON.stringify({
          query: queryString,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result: GraphQLResponse<T> = await response.json();

      if (result.errors && result.errors.length > 0) {
        const errorMessage = result.errors.map((e) => e.message).join(", ");
        throw new Error(`GraphQL Error: ${errorMessage}`);
      }

      if (!result.data) {
        throw new Error("No data returned from GraphQL server");
      }

      return result.data;
    } catch (error) {
      console.error("GraphQL request failed:", error);
      throw error;
    }
  },
};
