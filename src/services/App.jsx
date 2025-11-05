import Navbar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";


export default function App() {
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