import { useStytchSession } from "@src/hooks/auth/useStytchSession";
import { getAuthUrl } from "@src/utils/environment";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { LoadingSpinner } from "./LoadingSpinner";

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
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-600">
            {t("authentication.checkValidSession")}
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-gray-600">
              {t("authentication.checkValidSession")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isValid) {
    // This state should be temporary - we're redirecting to IDP app
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-600">
            {t("authentication.redirectingToLogin")}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
