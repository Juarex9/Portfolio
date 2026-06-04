const routeLoaders = {
  "/": () => import("../pages/Home.jsx"),
  "/proyectos": () => import("../pages/Proyectos.jsx"),
  "/proyecto": () => import("../pages/Proyecto.jsx"),
  "/educacion": () => import("../pages/Educacion.jsx"),
  "/sobremi": () => import("../pages/Sobremi.jsx"),
  "/contacto": () => import("../pages/Contacto.jsx"),
  "/experiencias": () => import("../pages/Experiencia.jsx"),
  "/404": () => import("../pages/NotFound.jsx"),
};

const prefetched = new Set();

function resolveRouteKey(path) {
  if (path.startsWith("/experiencias/")) return "/experiencias";
  if (path.startsWith("/proyectos/")) return "/proyecto";
  if (path === "/freelance" || path === "/personal") return "/proyectos";
  return routeLoaders[path] ? path : null;
}

export function prefetchRoute(path) {
  const key = resolveRouteKey(path);
  if (!key || prefetched.has(key)) return;
  prefetched.add(key);
  void routeLoaders[key]();
}

export function prefetchAllRoutes() {
  Object.keys(routeLoaders).forEach((path) => prefetchRoute(path));
}

export const importHome = routeLoaders["/"];
export const importProyectos = routeLoaders["/proyectos"];
export const importProyecto = routeLoaders["/proyecto"];
export const importEducacion = routeLoaders["/educacion"];
export const importSobreMi = routeLoaders["/sobremi"];
export const importContacto = routeLoaders["/contacto"];
export const importExperiencia = routeLoaders["/experiencias"];
export const importNotFound = routeLoaders["/404"];
