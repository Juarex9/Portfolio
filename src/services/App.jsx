import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { VisuallyHidden, Box, useColorModeValue } from "@chakra-ui/react";

import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const dotColor = useColorModeValue(
    "rgba(0, 0, 0, 0.08)",
    "rgba(255, 255, 255, 0.03)"
  );

  return (
    <>
      <VisuallyHidden as="a" href="#main-content">
        {i18n.language === "es" ? "Saltar al contenido principal" : "Skip to main content"}
      </VisuallyHidden>
      <Navbar />
      <main id="main-content" tabIndex={-1} position="relative">
        <Box
          position="absolute"
          inset={0}
          bgImage={`radial-gradient(${dotColor} 1px, transparent 1px)`}
          bgSize={{ base: "16px 16px", md: "20px 20px" }}
          pointerEvents="none"
          zIndex={0}
        />
        <Box position="relative" zIndex={1}>
          <Outlet />
        </Box>
      </main>
      <Footer />
    </>
  );
}
