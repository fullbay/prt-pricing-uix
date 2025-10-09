import PartPricingScales from "@features/PartPricingScales/Dashboard.tsx";
import { FBIcon, FBSpinner } from "@fullbay/forge";
import { useStytchSession } from "@src/hooks/auth/useStytchSession";
import React from "react";
import { useTranslation } from "react-i18next";

const MyComponent: React.FC = () => {
  const { t } = useTranslation();
  const { loading: authIsLoading, isValid: authIsValid } = useStytchSession();

  if (authIsLoading || !authIsValid) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        <div className="flex flex-col items-center">
          <FBSpinner
            dataFbTestId="auth-spinner"
            icon={
              <FBIcon
                iconName="wrench"
                dataFbTestId="loading"
                ariaLabel={t("authentication.checkingSession")}
                iconSize={32}
              />
            }
          />
          <p className="mt-2">{t("authentication.checkingSession")}</p>
        </div>
      </div>
    );
  }

  return <PartPricingScales />;
};

export default MyComponent;
