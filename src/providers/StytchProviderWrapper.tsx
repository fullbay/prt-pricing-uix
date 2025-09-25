import { ProtectedRoute } from "@src/components/auth/ProtectedRoute";
import { StytchB2BProvider } from "@stytch/react/b2b";
import React, { useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { getStytchClient } from "../lib/stytchClient";

interface StytchProviderWrapperProps {
  children: React.ReactNode;
}

export const StytchProviderWrapper: React.FC<StytchProviderWrapperProps> = ({
  children,
}) => {
  try {
    const stytchClient = useMemo(() => {
      return getStytchClient();
    }, []);

    if (!stytchClient) {
      console.warn(
        "Stytch client not available - rendering without authentication context"
      );
      throw new Error("Stytch client initialization failed");
    }

    return (
      <ErrorBoundary
        fallback={<>Unexpected error in Authentication</>}
        onError={(error) => {
          console.error("Unexpected error in Authentication", error);
        }}
      >
        <StytchB2BProvider stytch={stytchClient}>
          <ProtectedRoute>{children}</ProtectedRoute>
        </StytchB2BProvider>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error("Authentication Failure:", error);
    return <div>There was an error initializing authentication.</div>;
  }
};
