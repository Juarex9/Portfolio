import { Link as RouterLink } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { projects, getProjectDetailPath } from "../data/projects.js";
import { Badge } from "@/components/ui/badge";

const MotionDiv = motion.div;

export default function Proyectos() {
  const { accentColor, borderColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();

  return (
    <>
      <Seo titleKey="seo.projects.title" descriptionKey="seo.projects.description" canonicalPath="/proyectos" />
      <div className="min-h-screen w-full bg-transparent">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-16">
          <MotionDiv
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-0.5 w-8 rounded-full" style={{ backgroundColor: accentColor }} />
                  <Badge
                    className="normal-case"
                    style={{ backgroundColor: `${accentColor}15`, color: accentColor, fontFamily: "var(--font-body)" }}
                  >
                    {t("projects.badge")}
                  </Badge>
                </div>

                <h1
                  className="mb-2 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl md:text-4xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {t("projects.title")}
                </h1>

                <p className="max-w-2xl text-sm text-gray-500 md:text-base" style={{ fontFamily: "var(--font-body)" }}>
                  {t("projects.subtitle")}
                </p>
              </div>

              <a
                href="https://github.com/Juarex9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 shrink-0 items-center rounded-full border bg-transparent px-5 text-sm font-semibold transition-all duration-300 hover:text-white"
                style={{
                  borderColor: accentColor,
                  color: accentColor,
                  fontFamily: "var(--font-body)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = accentColor; e.currentTarget.style.color = "white"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = accentColor; }}
              >
                {t("projects.github_button")}
              </a>
            </div>
          </MotionDiv>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {projects.map((project, index) => {
              const baseKey = `projects.items.${project.key}`;
              const detailPath = getProjectDetailPath(project);
              const techList = t(`${baseKey}.tech`, { returnObjects: true });

              return (
                <MotionDiv
                  key={project.key}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.5,
                    delay: prefersReducedMotion ? 0 : (index % 2) * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  <article
                    className="flex h-full flex-col overflow-hidden rounded-xl border shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    style={{ borderColor }}
                  >
                    {project.image && (
                      <div className="relative h-40 shrink-0 overflow-hidden md:h-[180px]">
                        <img
                          src={project.image}
                          alt={t(`${baseKey}.title`)}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-4">
                      <div className="mb-2 flex flex-wrap gap-2">
                        <Badge
                          className="normal-case px-2 py-0.5 text-xs"
                          style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                        >
                          {t(`projects.types.${project.type}`)}
                        </Badge>
                      </div>

                      <h2 className="mb-1 text-sm font-bold" style={{ fontFamily: "var(--font-display)" }}>
                        {t(`${baseKey}.title`)}
                      </h2>

                      <p className="mb-2 text-xs font-medium" style={{ color: accentColor, fontFamily: "var(--font-body)" }}>
                        {t(`${baseKey}.subtitle`)}
                      </p>

                      <p className="mb-1 text-xs leading-relaxed text-gray-500" style={{ fontFamily: "var(--font-body)" }}>
                        <span className="font-semibold text-gray-600 dark:text-gray-400">
                          {t("projects.card.problem_label")}{" "}
                        </span>
                        {t(`${baseKey}.problem`)}
                      </p>

                      <p className="mb-3 text-xs leading-relaxed text-gray-500" style={{ fontFamily: "var(--font-body)" }}>
                        <span className="font-semibold text-gray-600 dark:text-gray-400">
                          {t("projects.card.role_label")}{" "}
                        </span>
                        {t(`${baseKey}.role`)}
                      </p>

                      <div className="mb-3 flex flex-1 flex-wrap content-start gap-1.5">
                        {Array.isArray(techList) &&
                          techList.map((techItem) => (
                            <span
                              key={techItem}
                              className="rounded-full px-2 py-0.5 text-xs font-medium"
                              style={{
                                backgroundColor: `${accentColor}15`,
                                color: accentColor,
                                fontFamily: "var(--font-body)",
                              }}
                            >
                              {techItem}
                            </span>
                          ))}
                      </div>

                      <div className="mt-auto flex flex-wrap gap-2">
                        {detailPath && (
                          <RouterLink
                            to={detailPath}
                            className="inline-flex h-8 items-center rounded-full px-3 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                            style={{ backgroundColor: accentColor, fontFamily: "var(--font-body)" }}
                          >
                            {t("projects.read_more")}
                          </RouterLink>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-8 items-center gap-1.5 rounded-full border bg-transparent px-3 text-xs font-semibold transition-all duration-300"
                            style={{
                              borderColor: accentColor,
                              color: accentColor,
                              fontFamily: "var(--font-body)",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${accentColor}10`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                          >
                            <FaGithub />
                            {t("projects.code_button")}
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-8 items-center gap-1.5 rounded-full border bg-transparent px-3 text-xs font-semibold transition-all duration-300"
                            style={{
                              borderColor: accentColor,
                              color: accentColor,
                              fontFamily: "var(--font-body)",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${accentColor}10`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                          >
                            <FaExternalLinkAlt />
                            {t("projects.demo_button")}
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
