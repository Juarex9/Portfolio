export const ROUTES = {
  home: { es: "/", en: "/en/" },
  projects: { es: "/proyectos", en: "/en/projects" },
  education: { es: "/educacion", en: "/en/education" },
  about: { es: "/sobremi", en: "/en/about" },
  contact: { es: "/contacto", en: "/en/contact" },
};

export function routeFor(key, locale = "es") {
  return ROUTES[key]?.[locale] ?? ROUTES[key]?.es ?? "/";
}

export function projectPath(key, locale = "es") {
  const base = locale === "en" ? "/en/projects" : "/proyectos";
  return `${base}/${key}`;
}

export function experiencePath(slug, locale = "es") {
  const base = locale === "en" ? "/en/experiences" : "/experiencias";
  return `${base}/${slug}`;
}

export function isExperiencePath(pathname) {
  return pathname.startsWith("/experiencias/") || pathname.startsWith("/en/experiences/");
}
