import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "../hooks/useReducedMotion";
import ProjectMagazineCarousel from "./ProjectMagazineCarousel.jsx";

const MotionDiv = motion.div;

export default function IntroPresentation() {
  const { accentColor } = useAccentColors();
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const images = [
    { src: "/price-scraper-full.png", key: "scraper-precios" },
    { src: "/ink-risk.png", key: "ink-ai-risk-detector" },
    { src: "/ink-full.png", key: "ink-ai-risk-detector" },
    { src: "/fintrack-full.png", key: "fintrack" },
  ].map((item) => ({
    src: item.src,
    label: t(`projects.items.${item.key}.title`),
  }));

  const links = t("presentation.links", { returnObjects: true }) || [];

  return (
    <section className="w-full bg-transparent py-12 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <MotionDiv
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                <img
                  src="/mirando-al-horizonte-modified.png"
                  alt="profile"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="text-xs text-gray-500">
                <p className="text-sm font-bold" style={{ fontFamily: "var(--font-display)" }}>Agustín Juárez</p>
                <p style={{ fontFamily: "var(--font-body)" }}>Argentina (UTC-3)</p>
              </div>
            </div>

            <h2
              className="mb-4 text-xl font-extrabold leading-tight tracking-tight sm:text-2xl md:text-3xl lg:text-4xl"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              {t("presentation.intro_title")}
            </h2>

            <p
              className="mb-5 max-w-2xl text-sm leading-[1.7] text-gray-500 md:text-base"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t("presentation.intro_text")}
            </p>

            <div className="flex flex-wrap gap-2">
              {links.map((l) => (
                <a
                  key={l.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={l.href.startsWith("/") ? l.href : `/${l.href.replace("./", "")}`}
                  className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
                  style={{ backgroundColor: accentColor, fontFamily: "var(--font-body)" }}
                >
                  <Download size={16} />
                  {l.label}
                </a>
              ))}
            </div>
          </MotionDiv>

          <MotionDiv
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.1 }}
            viewport={{ once: true }}
            className="mt-6 lg:col-span-5 lg:mt-0"
          >
            <p
              className="mb-3 text-xs font-bold uppercase tracking-wider"
              style={{ color: accentColor, fontFamily: "var(--font-body)" }}
            >
              {t("presentation.intro_focus")}
            </p>
            <div className="flex flex-col gap-3 text-sm text-gray-500">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-2">
                  <span
                    className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                  <p className="text-xs leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    {t(`presentation.intro_b${i}`)}
                  </p>
                </div>
              ))}
            </div>
          </MotionDiv>
        </div>

        <div className="mt-8 w-full max-w-full overflow-hidden md:mt-12">
          <ProjectMagazineCarousel images={images} accentColor={accentColor} />
        </div>
      </div>
    </section>
  );
}
