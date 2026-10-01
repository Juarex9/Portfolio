export const experiences = [
  {
    slug: "punatech-2026",
    image: "/yospeaker.webp",
    gallery: ["/yospeaker.webp", "/fotogrupal.webp", "/lospibes.webp", "/premiospuna.webp"],
    roles: ["speaker", "mentor", "staff"],
    eventUrl: "https://punatech.ar",
  },
  {
    slug: "emprendeamos-2022",
    image: "/emprendamos.webp",
    roles: ["developer"],
  },
  {
    slug: "sub0-2025",
    image: "/sub-cero-event.webp",
    roles: ["developer"],
  },
  {
    slug: "aleph-2026",
    image: "/aleph.webp",
    projectKey: "ink-ai-risk-detector",
    roles: ["developer"],
  },
  {
    slug: "vendimiatech-2026",
    image: "/vendimiatech.webp",
    projectKey: "vitistrust",
    roles: ["developer", "organizer"],
  },
  {
    slug: "saltadev-staff",
    image: "/saltadev.webp",
    roles: ["organizer"],
  },
];

export function getExperienceBySlug(slug) {
  return experiences.find((item) => item.slug === slug);
}
