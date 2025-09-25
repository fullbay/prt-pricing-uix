import { useStytchB2BClient, useStytchMemberSession } from "@stytch/react/b2b";
import { useCallback, useEffect, useState } from "react";

export const useStytchSession = () => {
  const stytch = useStytchB2BClient();
  const { session, isInitialized } = useStytchMemberSession();
  const [authLoading, setAuthLoading] = useState(true);
  const [, forceUpdate] = useState({});

  // Trigger session authentication on mount
  useEffect(() => {
    const checkSession = async () => {
      if (!stytch) {
        setAuthLoading(false);
        return;
      }

      try {
        // First check if tokens exist
        const tokens = stytch.session.getTokens();

        if (tokens?.session_jwt || tokens?.session_token) {
          await stytch.session.authenticate();

          // Force component re-render to pick up updated session
          forceUpdate({});
        }
      } catch (error) {
        console.error("Error authenticating session", error);
      } finally {
        setAuthLoading(false);
      }
    };

    if (isInitialized) {
      checkSession();
    }
  }, [isInitialized, stytch]);

  // Function to logout and destroy session
  const logout = useCallback(async () => {
    try {
      await stytch?.session?.revoke();
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, [stytch]);

  // Get the session JWT for GraphQL calls - for B2B it's in the tokens
  const tokens = stytch?.session.getTokens();
  const sessionJWT = tokens?.session_jwt || null;

  // Check if user is authenticated
  const isValid = isInitialized && !!session && !authLoading;

  // Loading state - wait for both stytch initialization and our auth check
  const loading = !isInitialized || authLoading;

  return {
    isValid,
    sessionJWT,
    session,
    loading,
    stytch,
    logout,
  };
};
