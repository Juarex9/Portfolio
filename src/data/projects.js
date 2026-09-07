export const projects = [
  {
    key: "gestion-turnos",
    type: "client",
    github: "https://github.com/Juarex9/gestor-turnos.git",
    demo: "",
    image: "/gestor-turnos.png",
    featured: true,
  },
  {
    key: "scraper-precios",
    type: "sideProject",
    github: "https://github.com/Juarex9/prices-scraper.git",
    demo: "https://precios.agustinjz.dev/",
    image: "/price-scraper.png",
    featured: true,
  },
  {
    key: "leivy",
    type: "hackathon",
    github: "https://github.com/Juarex9/Sub0_data.git",
    demo: "",
    image: "/sub-cero.png",
  },
  {
    key: "ink-ai-risk-detector",
    type: "hackathon",
    github: "https://github.com/Juarex9/aleph-backend.git",
    demo: "https://ink-three-iota.vercel.app/",
    image: "/ink-risk.png",
    featured: true,
  },
  {
    key: "vitistrust",
    type: "hackathon",
    github: "https://github.com/Juarex9/vitistrust.git",
    demo: "https://vitistrust.vercel.app",
    image: "/vitistrust.png",
  },
  {
    key: "zafra",
    type: "sideProject",
    github: "",
    demo: "",
    image: "/zafra.png",
    featured: true,
    hasDetailPage: true,
  },
  {
    key: "fintrack",
    type: "sideProject",
    github: "https://github.com/Juarex9/fintrack.git",
    demo: "",
  },
  {
    key: "real-time-chat",
    type: "sideProject",
    github: "https://github.com/Juarex9/chat-realtime.git",
    demo: "https://backend1-coderhouse.onrender.com/",
  },
  {
    key: "qcamp",
    type: "sideProject",
    github: "https://github.com/Juarex9/QCamp.git",
    demo: "",
    image: "/qcamp.png",
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug) {
  return projects.find((item) => item.key === slug);
}

export function getProjectDetailPath(project) {
  if (!project?.hasDetailPage) return null;
  return `/proyectos/${project.key}`;
}
