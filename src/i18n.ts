import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const storedLanguage = localStorage.getItem("lang") ?? "en";
const loadPath = import.meta.env.VITE_LOCALE_URL;

console.log("loadPath", loadPath);

i18n
  .use(HttpBackend) // Use the HTTP backend to load translations
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    backend: {
      loadPath: loadPath, // Path to your translation files
      // You can add other backend options here, e.g., for caching, custom fetch, etc.
    },
    lng: storedLanguage, // Default language
    fallbackLng: "en", // Fallback language if a translation is missing
    debug: true, // Enable debug mode for development (optional)
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
  });

export default i18n;
