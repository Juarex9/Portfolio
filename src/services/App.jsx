import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { VisuallyHidden, Box } from "@chakra-ui/react";

import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.body.classList.add("noise-overlay");
    
    return () => {
      document.body.classList.remove("noise-overlay");
    };
  }, [i18n.language]);

  return (
    <>
      <VisuallyHidden as="a" href="#main-content">
        {i18n.language === "es" ? "Saltar al contenido principal" : "Skip to main content"}
      </VisuallyHidden>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
