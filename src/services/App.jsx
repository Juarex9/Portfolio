import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Navbar from "../components/NavBar";
import Footer from "../components/Footer";


export default function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  return (
    <>
      <Navbar />
      {/* opcional: contenedor para el contenido */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}