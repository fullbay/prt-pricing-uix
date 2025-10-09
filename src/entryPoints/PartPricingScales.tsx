import { ThemeProvider } from "@src/contexts/Theme/ThemeProvider";
import { useMediaQuery } from "@src/hooks/useMediaQuery";
import { StytchProviderWrapper } from "@src/providers/StytchProviderWrapper";
import { useScreenSizeStore } from "@src/stores/screenSizeStore";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";

import MyComponent from "../components/MyComponent";
import i18n from "../i18n";

/*
 * This is the main entry point component for Module Federation.
 * It initializes the i18n provider and renders the Integrations component.
 */
export default function PartPricingScales() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1199px)");
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const { setScreenSize, clearInfo } = useScreenSizeStore();

  const shortSha = "SHORT_GIT_SHA_PLACEHOLDER";
  console.log("prt-pricing-uix short sha (PartPricingScales):", shortSha);

  useEffect(() => {
    clearInfo();

    const storedLanguage = localStorage.getItem("lang");
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }

    // Set screensize breakpoints for the UI rendering.
    if (isMobile) {
      setScreenSize("mobile");
    } else if (isTablet) {
      setScreenSize("tablet");
    } else {
      setScreenSize("desktop");
    }
  }, [clearInfo, isDesktop, isMobile, isTablet, setScreenSize]);

  return (
    <StytchProviderWrapper>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <MyComponent />
        </ThemeProvider>
      </I18nextProvider>
    </StytchProviderWrapper>
  );
}
