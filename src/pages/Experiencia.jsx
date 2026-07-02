import { Navigate, Link as RouterLink, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";
import { useAccentColors } from "../hooks/useAccentColors";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { getExperienceBySlug } from "../data/experiences.js";
import { getProjectBySlug, getProjectDetailPath } from "../data/projects.js";
import ExperienceGallery from "../components/ExperienceGallery";
import { Badge } from "@/components/ui/badge";

const MotionDiv = motion.div;

function RoleSection({ baseKey, role, accentColor, borderColor, t }) {
  const title = t(`${baseKey}.${role}.title`, { defaultValue: "" });
  const bullets = t(`${baseKey}.${role}.bullets`, { returnObjects: true, defaultValue: [] });

  if (!title || !Array.isArray(bullets) || bullets.length === 0) {
    return null;
  }

  return (
    <section className="rounded-xl border p-4 md:p-5" style={{ borderColor }}>
      <h2 className="mb-2 text-sm font-bold" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h2>
      <ul className="flex flex-col gap-2">
        {bullets.map((item) => (
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
  );
}

export default function Experiencia() {
  const { slug } = useParams();
  const experience = getExperienceBySlug(slug);
  const { t } = useTranslation();
  const { accentColor, borderColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();

  if (!experience) {
    return <Navigate to="/sobremi" replace />;
  }

  const baseKey = `experiences.items.${experience.slug}`;
  const title = t(`${baseKey}.title`);
  const projectKey = experience.projectKey;
  const linkedProject = projectKey ? getProjectBySlug(projectKey) : null;
  const projectLink = linkedProject ? getProjectDetailPath(linkedProject) || "/proyectos" : "/proyectos";

  return (
    <>
      <Seo
        titleKey={`${baseKey}.seo.title`}
        descriptionKey={`${baseKey}.seo.description`}
        canonicalPath={`/experiencias/${experience.slug}`}
      />
      <div className="min-h-screen w-full overflow-x-hidden bg-transparent">
        <div
          className="mx-auto px-4 py-8 md:px-6 md:py-16"
          style={{ maxWidth: experience.gallery ? "56rem" : "48rem" }}
        >
          <RouterLink
            to="/sobremi"
            className="mb-6 inline-flex h-9 items-center gap-2 rounded-full px-3 text-sm text-gray-500 transition-colors hover:opacity-80"
            style={{ fontFamily: "var(--font-body)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = accentColor; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = ""; }}
          >
            <ArrowLeft className="h-4 w-4" />
            {t("experiences.back")}
          </RouterLink>

          <MotionDiv
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge
                className="normal-case"
                style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
              >
                {t(`${baseKey}.subtitle`)}
              </Badge>
              <span className="text-xs text-gray-500" style={{ fontFamily: "var(--font-body)" }}>
                {t(`${baseKey}.date`)}
              </span>
            </div>

            <h1
              className="mb-4 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h1>

            <div className="mb-6 flex flex-wrap gap-2">
              {experience.roles.map((role) => (
                <Badge
                  key={role}
                  className="normal-case border bg-transparent"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  {t(`experiences.roles.${role}`)}
                </Badge>
              ))}
            </div>

            {experience.gallery ? (
              <ExperienceGallery
                images={experience.gallery}
                title={t("experiences.sections.gallery")}
                borderColor={borderColor}
                getAlt={(key) => t(`${baseKey}.gallery.alt.${key}`, { defaultValue: title })}
              />
            ) : (
              <div className="mb-8 overflow-hidden rounded-xl border" style={{ borderColor }}>
                <img
                  src={experience.image}
                  alt={title}
                  className="max-h-[220px] w-full object-cover md:max-h-[320px]"
                />
              </div>
            )}

            <div className="flex flex-col gap-8">
              <section>
                <h2 className="mb-3 text-sm font-bold" style={{ fontFamily: "var(--font-display)", color: accentColor }}>
                  {t("experiences.sections.context")}
                </h2>
                <p className="text-sm leading-relaxed text-gray-500 md:text-base" style={{ fontFamily: "var(--font-body)" }}>
                  {t(`${baseKey}.context`)}
                </p>
              </section>

              {experience.roles.map((role) => (
                <RoleSection
                  key={role}
                  baseKey={baseKey}
                  role={role}
                  accentColor={accentColor}
                  borderColor={borderColor}
                  t={t}
                />
              ))}

              <section>
                <h2 className="mb-3 text-sm font-bold" style={{ fontFamily: "var(--font-display)", color: accentColor }}>
                  {t("experiences.sections.outcome")}
                </h2>
                <p className="text-sm leading-relaxed text-gray-500 md:text-base" style={{ fontFamily: "var(--font-body)" }}>
                  {t(`${baseKey}.outcome`)}
                </p>
              </section>

              {(projectKey || experience.eventUrl) && (
                <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
                  {projectKey && (
                    <RouterLink
                      to={projectLink}
                      className="inline-flex h-10 items-center rounded-full border bg-transparent px-5 text-sm font-semibold transition-all duration-300"
                      style={{ borderColor: accentColor, color: accentColor, fontFamily: "var(--font-body)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${accentColor}10`; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      {t("experiences.view_project")}: {t(`projects.items.${projectKey}.title`)}
                    </RouterLink>
                  )}
                  {experience.eventUrl && (
                    <a
                      href={experience.eventUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-full border bg-transparent px-5 text-sm font-semibold transition-all duration-300"
                      style={{ borderColor: accentColor, color: accentColor }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${accentColor}10`; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      {t("experiences.view_event")}
                      <ExternalLink className="h-3.5 w-3.5" />
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
