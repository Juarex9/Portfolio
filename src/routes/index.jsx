import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "../services/App.jsx";

const Home = lazy(() => import("../pages/Home.jsx"));
const Proyectos = lazy(() => import("../pages/Proyectos.jsx"));
const Educacion = lazy(() => import("../pages/Educacion.jsx"));
const SobreMi = lazy(() => import("../pages/Sobremi.jsx"));
const Contacto = lazy(() => import("../pages/Contacto.jsx"));
const Freelance = lazy(() => import("../pages/Freelance.jsx"));
const Personal = lazy(() => import("../pages/Personal.jsx"));

function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      color: '#4ade80'
    }}>
      <span style={{ fontFamily: 'system-ui', fontSize: '0.875rem' }}>Cargando...</span>
    </div>
  );
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,               
        children: [
            { index: true, element: <Suspense fallback={<PageLoader />}><Home /></Suspense> },
            {
                path: "/proyectos",
                element: <Suspense fallback={<PageLoader />}><Proyectos /></Suspense>
            },
            {
                path: "/freelance",
                element: <Suspense fallback={<PageLoader />}><Freelance /></Suspense>
            },
            {
                path: "/personal",
                element: <Suspense fallback={<PageLoader />}><Personal /></Suspense>
            },
            {
                path: "/educacion",
                element: <Suspense fallback={<PageLoader />}><Educacion /></Suspense>
            },
            {
                path: "/sobremi",
                element: <Suspense fallback={<PageLoader />}><SobreMi /></Suspense>
            },
            {
                path: "/contacto",
                element: <Suspense fallback={<PageLoader />}><Contacto /></Suspense>
            }
        ],
    },
]);
