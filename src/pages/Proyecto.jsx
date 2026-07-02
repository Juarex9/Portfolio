import { Navigate, Link as RouterLink, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";
import { useAccentColors } from "../hooks/useAccentColors";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { getProjectBySlug } from "../data/projects.js";
import { Badge } from "@/components/ui/badge";

const MotionDiv = motion.div;

export default function Proyecto() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const { t } = useTranslation();
  const { accentColor, borderColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();

  if (!project?.hasDetailPage) {
    return <Navigate to="/proyectos" replace />;
  }

  const baseKey = `projects.items.${project.key}`;
  const title = t(`${baseKey}.title`);
  const tech = t(`${baseKey}.tech`, { returnObjects: true });
  const highlights = t(`${baseKey}.highlights`, { returnObjects: true, defaultValue: [] });

  return (
    <>
      <Seo
        titleKey={`${baseKey}.seo.title`}
        descriptionKey={`${baseKey}.seo.description`}
        canonicalPath={`/proyectos/${project.key}`}
      />
      <div className="min-h-screen w-full overflow-x-hidden bg-transparent">
        <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-16">
          <RouterLink
            to="/proyectos"
            className="mb-6 inline-flex h-9 items-center gap-2 rounded-full px-3 text-sm text-gray-500 transition-colors hover:opacity-80"
            style={{ fontFamily: "var(--font-body)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = accentColor; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = ""; }}
          >
            <ArrowLeft className="h-4 w-4" />
            {t("projects.back")}
          </RouterLink>

          <MotionDiv
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          >
            <Badge
              className="mb-3 normal-case"
              style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
            >
              {t(`projects.types.${project.type}`)}
            </Badge>

            <h1
              className="mb-2 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h1>

            <p className="mb-6 text-base font-medium" style={{ color: accentColor, fontFamily: "var(--font-body)" }}>
              {t(`${baseKey}.subtitle`)}
            </p>

            {project.image && (
              <div className="mb-8 overflow-hidden rounded-xl border" style={{ borderColor }}>
                <img
                  src={project.image}
                  alt={title}
                  className="max-h-[280px] w-full bg-black/5 object-contain md:max-h-[400px]"
                />
              </div>
            )}

            <div className="flex flex-col gap-8">
              <section>
                <h2 className="mb-3 text-sm font-bold" style={{ fontFamily: "var(--font-display)", color: accentColor }}>
                  {t("projects.sections.problem")}
                </h2>
                <p className="text-sm leading-relaxed text-gray-500 md:text-base" style={{ fontFamily: "var(--font-body)" }}>
                  {t(`${baseKey}.problem`)}
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-sm font-bold" style={{ fontFamily: "var(--font-display)", color: accentColor }}>
                  {t("projects.sections.context")}
                </h2>
                <p className="text-sm leading-relaxed text-gray-500 md:text-base" style={{ fontFamily: "var(--font-body)" }}>
                  {t(`${baseKey}.context`)}
                </p>
              </section>

              {Array.isArray(highlights) && highlights.length > 0 && (
                <section className="rounded-xl border p-4 md:p-5" style={{ borderColor }}>
                  <h2 className="mb-3 text-sm font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    {t("projects.sections.highlights")}
                  </h2>
                  <ul className="flex flex-col gap-2">
                    {highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm leading-relaxed text-gray-500"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accentColor }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section>
                <h2 className="mb-3 text-sm font-bold" style={{ fontFamily: "var(--font-display)", color: accentColor }}>
                  {t("projects.sections.role")}
                </h2>
                <p className="text-sm leading-relaxed text-gray-500 md:text-base" style={{ fontFamily: "var(--font-body)" }}>
                  {t(`${baseKey}.role`)}
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-sm font-bold" style={{ fontFamily: "var(--font-display)", color: accentColor }}>
                  {t("projects.sections.outcome")}
                </h2>
                <p className="text-sm leading-relaxed text-gray-500 md:text-base" style={{ fontFamily: "var(--font-body)" }}>
                  {t(`${baseKey}.outcome`)}
                </p>
              </section>

              {Array.isArray(tech) && tech.length > 0 && (
                <section>
                  <h2 className="mb-3 text-sm font-bold" style={{ fontFamily: "var(--font-display)", color: accentColor }}>
                    {t("projects.sections.stack")}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {(project.github || project.demo) && (
                <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-full border bg-transparent px-5 text-sm font-semibold transition-all duration-300"
                      style={{ borderColor: accentColor, color: accentColor }}
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
                      className="inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: accentColor }}
                    >
                      <FaExternalLinkAlt />
                      {t("projects.demo_button")}
                    </a>
                  )}
                </div>
              )}
            </div>
          </MotionDiv>
        </div>
      </div>
    </>
  );
}
