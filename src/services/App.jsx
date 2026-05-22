import { Outlet } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, useColorModeValue } from "@chakra-ui/react";

import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor.jsx";
import { prefetchAllRoutes } from "../routes/pageImports.js";

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
    "rgba(255, 255, 255, 0.03)"
  );
  const skipLinkBg = useColorModeValue("blue.600", "blue.400");

  const skipLabel = i18n.language === "es" ? "Saltar al contenido principal" : "Skip to main content";

  return (
    <>
      <CustomCursor />
      <Box
        as="a"
        href="#main-content"
        className="skip-link"
        bg={skipLinkBg}
        color="white"
        fontFamily="var(--font-body)"
        fontSize="sm"
        fontWeight="600"
        borderRadius="md"
        zIndex={1000}
      >
        {skipLabel}
      </Box>
      <Navbar />
      <main id="main-content" tabIndex={-1} position="relative" overflowX="hidden" w="full">
        <Box
          position="absolute"
          inset={0}
          bgImage={`radial-gradient(${dotColor} 1px, transparent 1px)`}
          bgSize={{ base: "16px 16px", md: "20px 20px" }}
          pointerEvents="none"
          zIndex={0}
        />
        <Box position="relative" zIndex={1}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </Box>
      </main>
      <Footer />
    </>
  );
}
