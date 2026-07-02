import { Outlet } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor.jsx";
import { prefetchAllRoutes } from "../routes/pageImports.js";
import { useColorModeValue } from "../hooks/useColorModeValue.js";

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    const prefetch = () => prefetchAllRoutes();

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(prefetch, { timeout: 2000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(prefetch, 800);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const dotColor = useColorModeValue(
    "rgba(0, 0, 0, 0.08)",
    "rgba(255, 255, 255, 0.03)",
  );

  const skipLabel =
    i18n.language === "es" ? "Saltar al contenido principal" : "Skip to main content";

  return (
    <>
      <CustomCursor />
      <a
        href="#main-content"
        className="skip-link rounded-md bg-blue-600 text-sm font-semibold text-white dark:bg-blue-400"
        style={{ fontFamily: "var(--font-body)", zIndex: 1000 }}
      >
        {skipLabel}
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative w-full overflow-x-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[length:16px_16px] md:bg-[length:20px_20px]"
          style={{
            backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
          }}
        />
        <div className="relative z-[1]">
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
