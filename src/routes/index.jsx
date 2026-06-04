import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import App from "../services/App.jsx";
import {
  importContacto,
  importEducacion,
  importExperiencia,
  importHome,
  importNotFound,
  importProyectos,
  importProyecto,
  importSobreMi,
} from "./pageImports.js";

const Home = lazy(importHome);
const Proyectos = lazy(importProyectos);
const Proyecto = lazy(importProyecto);
const Educacion = lazy(importEducacion);
const SobreMi = lazy(importSobreMi);
const Contacto = lazy(importContacto);
const NotFound = lazy(importNotFound);
const Experiencia = lazy(importExperiencia);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/proyectos", element: <Proyectos /> },
      { path: "/proyectos/:slug", element: <Proyecto /> },
      { path: "/freelance", element: <Navigate to="/proyectos" replace /> },
      { path: "/personal", element: <Navigate to="/proyectos" replace /> },
      { path: "/educacion", element: <Educacion /> },
      { path: "/sobremi", element: <SobreMi /> },
      { path: "/experiencias/:slug", element: <Experiencia /> },
      { path: "/contacto", element: <Contacto /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
