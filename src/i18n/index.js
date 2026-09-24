import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import es from "./locales/es.json";
import en from "./locales/en.json";

export const LOCALES = ["es", "en"];
export const DEFAULT_LOCALE = "es";

const resources = {
  es: { translation: es },
  en: { translation: en },
};

export function createI18n(lng = DEFAULT_LOCALE) {
  const instance = i18next.createInstance();
  instance.use(initReactI18next).init({
    lng,
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: LOCALES,
    load: "languageOnly",
    nonExplicitSupportedLngs: true,
    debug: false,
    resources,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
  return instance;
}

export default createI18n;
