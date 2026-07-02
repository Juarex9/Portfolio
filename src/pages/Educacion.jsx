import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Badge } from "@/components/ui/badge";

const MotionDiv = motion.div;

export default function EducationTimeline() {
  const { accentColor, borderColor, bgColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();

  const items = ["ucasal", "reparando", "coder"].map((key) => {
    const base = `education.${key}`;
    return {
      key,
      title: t(`${base}.title`),
      institution: t(`${base}.institution`),
      location: t(`${base}.location`),
      start: t(`${base}.start`),
      end: t(`${base}.end`),
      highlights: t(`${base}.highlights`, { returnObjects: true }) || [],
      tags: t(`${base}.tags`, { returnObjects: true }) || [],
      links: t(`${base}.links`, { returnObjects: true }) || [],
    };
  });

  return (
    <>
      <Seo titleKey="seo.education.title" descriptionKey="seo.education.description" canonicalPath="/educacion" />
      <div className="min-h-screen w-full bg-transparent">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-16">
          <MotionDiv
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="h-0.5 w-8 rounded-full" style={{ backgroundColor: accentColor }} />
              <Badge
                className="normal-case"
                style={{ backgroundColor: `${accentColor}15`, color: accentColor, fontFamily: "var(--font-body)" }}
              >
                {t("education.section.badge")}
              </Badge>
            </div>
            <h1
              className="mb-2 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("education.section.heading")}
            </h1>
            <p className="max-w-2xl text-sm text-gray-500 md:text-base" style={{ fontFamily: "var(--font-body)" }}>
              {t("education.section.desc")}
            </p>
          </MotionDiv>

          <div className="relative pl-6 md:pl-10">
            <div
              className="absolute bottom-0 left-[15px] top-0 w-0.5 rounded-full md:left-[23px]"
              style={{ backgroundColor: borderColor }}
            />

            <div className="flex flex-col gap-6 md:gap-8">
              {items.map((it, idx) => (
                <MotionDiv
                  key={it.key}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : idx * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <span
                    className="absolute -left-[21px] top-5 z-[1] h-3 w-3 rounded-full border-2 md:-left-[29px] md:top-6 md:h-4 md:w-4"
                    style={{
                      backgroundColor: bgColor,
                      borderColor: accentColor,
                      boxShadow: `0 0 0 4px ${bgColor}`,
                    }}
                  />

                  <div
                    className="rounded-xl border p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md md:p-5"
                    style={{ borderColor }}
                  >
                    <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                      <div className="flex flex-col items-start">
                        <h2 className="text-sm font-bold" style={{ fontFamily: "var(--font-display)" }}>
                          {it.institution}
                        </h2>
                        <p className="text-xs text-gray-500">{it.location}</p>
                      </div>
                      <span
                        className="rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: `${accentColor}15`,
                          color: accentColor,
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {it.start} – {it.end}
                      </span>
                    </div>

                    <h3
                      className="mb-3 text-xs font-semibold"
                      style={{ color: accentColor, fontFamily: "var(--font-display)" }}
                    >
                      {it.title}
                    </h3>

                    <div className="mb-4 flex flex-col gap-2">
                      {it.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span
                            className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: accentColor }}
                          />
                          <p className="text-xs leading-relaxed text-gray-500" style={{ fontFamily: "var(--font-body)" }}>
                            {h}
                          </p>
                        </div>
                      ))}
                    </div>

                    {it.tags.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {it.tags.map((tTag) => (
                          <span
                            key={tTag}
                            className="rounded-full px-2 py-0.5 text-xs font-medium"
                            style={{
                              backgroundColor: `${accentColor}15`,
                              color: accentColor,
                              fontFamily: "var(--font-body)",
                            }}
                          >
                            {tTag}
                          </span>
                        ))}
                      </div>
                    )}

                    {it.links.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {it.links.map((l) => (
                          <a
                            key={l.label}
                            href={l.href}
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
                            {l.label}
                            <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
