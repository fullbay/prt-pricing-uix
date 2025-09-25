import {
  FBButton,
  FBCard,
  FBCardContent,
  FBCardHeader,
  FBCardTitle,
  FBInput,
  FBLabel,
} from "@fullbay/forge";
import { useState } from "react";

import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitch from "./ThemeSwitcher";

const SettingsLocal = () => {
  const [token, setToken] = useState("");

  const handleLogin = () => {
    console.log("token", token);
    sessionStorage.setItem("token", token);
  };
  return (
    <div className="flex flex-col h-full" data-fb-test-id="settings-component">
      <div style={{ height: "calc(100% - 60px)", overflow: "auto" }}>
        <LanguageSwitcher />
        <ThemeSwitch />
        <div className="mt-3">
          <FBCard className="p-4" dataFbTestId={"temp-spot"}>
            <FBCardHeader dataFbTestId="temp-api-card-header">
              <FBCardTitle dataFbTestId="temp-api-card-title">
                Temp API Token
              </FBCardTitle>
            </FBCardHeader>
            <FBCardContent dataFbTestId="temp-api-card-content">
              <FBLabel
                className="mb-2"
                dataFbTestId={"token"}
                children={"API Token"}
              />
              <FBInput
                dataFbTestId={"token"}
                placeholder="Token"
                onChange={(e) => setToken(e.target.value)}
              />
              <FBButton
                className="mt-3"
                dataFbTestId={"login"}
                onClick={handleLogin}
              >
                Save
              </FBButton>
            </FBCardContent>
          </FBCard>
        </div>
      </div>
    </div>
  );
};

export default SettingsLocal;
