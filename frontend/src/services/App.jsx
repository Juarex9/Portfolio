import Navbar from "../components/NavBar";
import { Outlet } from "react-router-dom";


export default function App() {
  return (
    <>
      <Navbar />
      {/* opcional: contenedor para el contenido */}
      <main>
        <Outlet />
      </main>
      {/* opcional: <Footer /> */}
    </>
  );
}