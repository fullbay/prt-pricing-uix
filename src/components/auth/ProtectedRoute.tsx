import { AuthMessageScreen } from "@components/auth/AuthMessageScreen.tsx";
import { useStytchSession } from "@src/hooks/auth/useStytchSession";
import { getAuthUrl } from "@src/utils/environment";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isValid, loading } = useStytchSession();
  const { t } = useTranslation();

  const authUrl = getAuthUrl();

  useEffect(() => {
    // Only redirect if we're definitely not authenticated (after loading completes)
    if (!loading && !isValid) {
      if (authUrl.includes("localhost")) {
        return () => {}; // Skip redirect in local dev to allow testing without full auth flow
      }

      // Add a small delay to prevent redirect loops due to async session checks
      const timeoutId = setTimeout(() => {
        const currentUrl = window.location.href;
        const returnUrl = encodeURIComponent(currentUrl);
        window.location.href = `${authUrl}?return_url=${returnUrl}`;
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [loading, isValid, authUrl]);

  if (!loading && !isValid) {
    return <AuthMessageScreen message={t("authentication.checkValidSession")} />;
  }

  if (loading) {
    return <AuthMessageScreen message={t("authentication.checkValidSession")} showSpinner />;
  }

  if (!isValid) {
    // This state should be temporary - we're redirecting to IDP app
    return <AuthMessageScreen
      message={t("authentication.redirectingToLogin")}
      showSpinner
      maxWidth="md"
    />;
  }

  return <>{children}</>;
};
