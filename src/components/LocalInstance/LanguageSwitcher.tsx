import {
  FBDropdownMenu,
  FBDropdownMenuItemProps,
  FBLabel,
} from "@fullbay/forge";
import i18n from "@src/i18n";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    setLanguage(i18n.language);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  const langOptions: FBDropdownMenuItemProps[] = [
    {
      label: "English (en)",
      dataFbTestId: "dropdown-en",
      id: "en",
    },
    {
      label: "PsuedoLocalization (zu)",
      dataFbTestId: "dropdown-zu",
      id: "zu",
    },
    {
      label: "Spanish (es)",
      dataFbTestId: "dropdown-es",
      id: "es",
    },
    {
      label: "Spanish Brazil (es_BR)",
      dataFbTestId: "dropdown-es_BR",
      id: "es_BR",
    },
    {
      label: "French (fr)",
      dataFbTestId: "dropdown-fr",
      id: "fr",
    },
    {
      label: "French Canadian (fr_CA)",
      dataFbTestId: "dropdown-fr_CA",
      id: "fr_CA",
    },
    {
      label: "Portuguese (pt)",
      dataFbTestId: "dropdown-pt",
      id: "pt",
    },
    {
      label: "Portuguese Brazil (pt_BR)",
      dataFbTestId: "dropdown-pt_BR",
      id: "pt_BR",
    },
    {
      label: "Russian (ru)",
      dataFbTestId: "dropdown-ru",
      id: "ru",
    },
  ];

  return (
    <div className="w-full mb-8 mt-3">
      <FBLabel
        dataFbTestId={"Language-selection"}
        children={t("main.chooseYourLanguage")}
        htmlFor="language-selector"
        className="mb-2"
      />
      <FBDropdownMenu
        dataFbTestId="language-selector"
        className="w-full"
        id="language-selector"
        onSelect={(event: string) => {
          changeLanguage(event);
        }}
        items={langOptions}
        trigger={
          langOptions.find((lang) => lang.id === language)?.label ||
          t("main.chooseYourLanguage")
        }
        triggerClass="w-full"
        menuClass="w-64"
      />
    </div>
  );
};

export default LanguageSwitcher;
