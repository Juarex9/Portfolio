import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { featuredProjects } from "../data/projects.js";
import FeaturedProjectStream from "./FeaturedProjectStream.jsx";
import { Badge } from "./ui/badge.jsx";

const MotionDiv = motion.div;

export default function FeaturedProjects() {
  const { accentColor, borderColor } = useAccentColors();
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="w-full max-w-[100vw] overflow-hidden bg-transparent py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <MotionDiv
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-12"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-0.5 w-10 rounded-full" style={{ backgroundColor: accentColor }} />
            <Badge style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
              {t("featured.badge")}
            </Badge>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2
                className="mb-3 text-3xl font-extrabold md:text-4xl lg:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t("featured.title")}
              </h2>
              <p
                className="max-w-2xl text-base text-gray-500 md:text-lg"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t("featured.subtitle")}
              </p>
            </div>
            <RouterLink
              to="/proyectos"
              className="text-lg font-semibold transition-opacity hover:opacity-80"
              style={{ color: accentColor, fontFamily: "var(--font-body)" }}
            >
              {t("featured.view_all")}
            </RouterLink>
          </div>
        </MotionDiv>

        <FeaturedProjectStream projects={featuredProjects} accentColor={accentColor} borderColor={borderColor} />
      </div>
    </section>
  );
}
