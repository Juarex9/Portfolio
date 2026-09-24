import { createContext, useContext } from "react";
import { routeFor, projectPath, experiencePath } from "./routes.js";

export const LocaleContext = createContext({
  locale: "es",
  currentPath: "/",
  paths: { es: "/", en: "/en/" },
});

export function useLocale() {
  return useContext(LocaleContext);
}

export function useLocalizedRoutes() {
  const { locale } = useContext(LocaleContext);
  return {
    locale,
    routeFor: (key) => routeFor(key, locale),
    projectPath: (key) => projectPath(key, locale),
    experiencePath: (slug) => experiencePath(slug, locale),
  };
}
