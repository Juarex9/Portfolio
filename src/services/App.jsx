import { Outlet } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import DotFieldBackground from "../components/DotFieldBackground.jsx";
import { prefetchAllRoutes } from "../routes/pageImports.js";

export default function App() {
  const { i18n } = useTranslation();

  const lang = (i18n.language || "es").split("-")[0];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const prefetch = () => prefetchAllRoutes();

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(prefetch, { timeout: 2000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(prefetch, 800);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const skipLabel =
    lang === "es" ? "Saltar al contenido principal" : "Skip to main content";

  return (
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
        <Navbar />
        <main id="main-content" tabIndex={-1} className="relative w-full overflow-x-hidden">
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  );
}
