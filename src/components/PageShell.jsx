import { useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createI18n } from "../i18n/index.js";
import { LocaleContext } from "../i18n/LocaleContext.jsx";
import { ThemeProvider } from "../hooks/useTheme.jsx";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import DotFieldBackground from "./DotFieldBackground.jsx";

export default function PageShell({ locale = "es", currentPath = "/", paths, children }) {
  const [i18n] = useState(() => createI18n(locale));
  const skipLabel = locale === "es" ? "Saltar al contenido principal" : "Skip to main content";

  const contextValue = {
    locale,
    currentPath,
    paths: paths ?? { es: "/", en: "/en/" },
  };

  return (
    <I18nextProvider i18n={i18n}>
      <LocaleContext.Provider value={contextValue}>
        <ThemeProvider>
          <div className="relative min-h-screen">
            <DotFieldBackground />
            <a
              href="#main-content"
              className="skip-link relative z-[1000] rounded-md bg-blue-600 text-sm font-semibold text-white dark:bg-blue-400"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {skipLabel}
            </a>
            <div className="relative z-[1]">
              <NavBar />
              <main id="main-content" tabIndex={-1} className="relative w-full overflow-x-hidden">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </LocaleContext.Provider>
    </I18nextProvider>
  );
}
