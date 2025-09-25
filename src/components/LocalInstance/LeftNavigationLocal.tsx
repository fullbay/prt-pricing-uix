import {
  FBButton,
  FBIcon,
  FBSheet,
  FBSheetClose,
  FBSheetContent,
  FBSheetFooter,
  FBSheetHeader,
  FBSheetTitle,
  FBSheetTrigger,
} from "@fullbay/forge";
import { useTranslation } from "react-i18next";

import SettingsLocal from "./SettingsLocal";

const LeftNavigationLocal = () => {
  const { t } = useTranslation();

  return (
    <div
      id="left-nav-div"
      className="h-full flex items-center flex-col"
      style={{ width: "55px", backgroundColor: "var(--color-ash-900)" }}
    >
      <FBSheet dataFbTestId={"settings-sheet"}>
        <FBSheetTrigger
          asChild
          className="w-full"
          dataFbTestId="settings-sheet-trigger"
        >
          <div>
            <FBButton
              className="w-full h-fit mt-3"
              dataFbTestId="settings-sheet-trigger-button"
              variant="default"
              style={{
                backgroundColor: "var(--color-ash-900)",
                color: "var(--color-ash-100)",
              }}
            >
              <FBIcon
                ariaLabel={t("main.navigation.settingsAriaLabel")}
                dataFbTestId={"settings-icon"}
                iconName={"settings"}
              />
            </FBButton>
          </div>
        </FBSheetTrigger>
        <FBSheetContent
          className="p-4"
          dataFbTestId="settings-sheet-content"
          side="left"
          aria-describedby={undefined}
        >
          <FBSheetHeader dataFbTestId="settings-sheet-header">
            <FBSheetTitle dataFbTestId="settings-sheet-title">
              {t("main.settingsTitle")}
            </FBSheetTitle>
          </FBSheetHeader>
          <SettingsLocal />
          <FBSheetFooter
            className="flex items-end"
            dataFbTestId="settings-sheet-footer"
          >
            <FBSheetClose dataFbTestId="settings-sheet-footer-close">
              <FBButton dataFbTestId={"close-button"} variant="secondary">
                {t("common.close")}
              </FBButton>
            </FBSheetClose>
          </FBSheetFooter>
        </FBSheetContent>
      </FBSheet>
    </div>
  );
};

export default LeftNavigationLocal;
