import { FBLabel, FBSwitch } from "@fullbay/forge";
import { useTranslation } from "react-i18next";

import { useTheme } from "../../contexts/Theme/ThemeContext";

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  const { t } = useTranslation();
  return (
    <div className="flex flex-row m-3">
      <FBSwitch
        dataFbTestId={"theme-switcher"}
        id={"theme-toggle"}
        onClick={toggleTheme}
        checked={theme === "dark"}
      />
      <FBLabel
        dataFbTestId={"theme-switch-label"}
        className="m-1"
        htmlFor="theme-toggle"
      >
        {t("main.theme.dark")}
      </FBLabel>
    </div>
  );
};

export default ThemeSwitch;
