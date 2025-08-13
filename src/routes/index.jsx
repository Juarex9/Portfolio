// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "../services/App.jsx";
import Home from "../pages/Home.jsx";
import Proyectos from "../pages/Proyectos.jsx";
import Educacion from "../pages/Educacion.jsx";
import SobreMi from "../pages/SobreMi.jsx";
import Contacto from "../pages/Contacto.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,               
        children: [
            { index: true, element: <Home /> },
            {
                path: "/proyectos",
                element: <Proyectos />
            },
            {
                path: "/educacion",
                element: <Educacion />
            },
            {
                path: "/sobremi",
                element: <SobreMi />
            },
            {
                path: "/contacto",
                element: <Contacto />
            },
        ],
    },
]);
