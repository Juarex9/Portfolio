export const experiences = [
  {
    slug: "punatech-2026",
    image: "/yospeaker.jpg",
    gallery: ["/yospeaker.jpg", "/fotogrupal.JPG", "/lospibes.jpg", "/premiospuna.JPG"],
    roles: ["speaker", "mentor", "staff"],
    eventUrl: "https://punatech.ar",
  },
  {
    slug: "emprendeamos-2022",
    image: "/emprendamos.jpg",
    roles: ["developer"],
  },
  {
    slug: "sub0-2025",
    image: "/sub-cero.jpg",
    projectKey: "leivy",
    roles: ["developer"],
  },
  {
    slug: "aleph-2026",
    image: "/aleph.jpg",
    projectKey: "ink-ai-risk-detector",
    roles: ["developer"],
  },
  {
    slug: "vendimiatech-2026",
    image: "/vendimiatech.png",
    projectKey: "vitistrust",
    roles: ["developer", "organizer"],
  },
  {
    slug: "saltadev-staff",
    image: "/saltadev.png",
    roles: ["organizer"],
  },
];

export function getExperienceBySlug(slug) {
  return experiences.find((item) => item.slug === slug);
}
