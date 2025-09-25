/* eslint-disable @typescript-eslint/no-explicit-any */

const API_URL = import.meta.env.VITE_GRAPHQL_ENDPOINT || "/not-set";
const API_KEY = sessionStorage.getItem("token");

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: string[];
    extensions?: Record<string, any>;
  }>;
};

export async function graphqlRequest<T = any, V = Record<string, any>>(
  query: string,
  variables?: V
): Promise<T> {
  if (!API_KEY) {
    console.error(
      "API key is not set. Please check your environment variables."
    );
    throw new Error("API key is not set");
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: API_KEY,
      },
      body: JSON.stringify({
        query,
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
}
