import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAccentColors } from "../hooks/useAccentColors";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { experiences } from "../data/experiences.js";
import { useColorModeValue } from "../hooks/useColorModeValue.js";
import { useLocalizedRoutes } from "../i18n/LocaleContext.jsx";
import { cn } from "@/lib/utils";

const MotionDiv = motion.div;

function ExperienceCard({ slug, title, subtitle, date, summary, imageSrc, opacity = 1, readMoreLabel, fitViewport = false, inactive = false }) {
  const { accentColor } = useAccentColors();
  const { experiencePath } = useLocalizedRoutes();
  const cardBg = useColorModeValue("#ffffff", "#111827");
  const cardBorderColor = useColorModeValue("#e5e7eb", "#374151");

  return (
    <article
      aria-hidden={inactive || undefined}
      className={cn(
        "group relative overflow-hidden rounded-xl border transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg",
        fitViewport ? "w-full max-w-full min-w-0" : "max-w-[360px] min-w-[260px] md:min-w-[300px]",
        inactive && "pointer-events-none select-none",
      )}
      style={{
        backgroundColor: cardBg,
        borderColor: cardBorderColor,
        opacity,
        transform: fitViewport ? "none" : opacity === 1 ? "scale(1.02)" : "scale(0.95)",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.borderColor = accentColor;
        event.currentTarget.style.transform = "scale(1.02) translateY(-4px)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.borderColor = cardBorderColor;
        event.currentTarget.style.transform = opacity === 1 ? "scale(1.02)" : "scale(0.95)";
      }}
    >
      <div className="h-40 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover"
          style={{ opacity }}
        />
      </div>

      <div className="flex flex-col items-start gap-2 p-4">
        <h3
          className="line-clamp-2 text-base font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <a
            href={experiencePath(slug)}
            tabIndex={inactive ? -1 : undefined}
            className="static no-underline after:absolute after:inset-0 hover:no-underline"
            style={{ color: "inherit" }}
            onMouseEnter={(event) => {
              event.currentTarget.style.color = accentColor;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.color = "inherit";
            }}
          >
            {title}
          </a>
        </h3>

        <p className="text-xs font-semibold" style={{ color: accentColor }}>
          {subtitle}
        </p>

        <p className="text-xs text-muted-foreground">{date}</p>

        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{summary}</p>

        <p
          className="text-xs font-semibold"
          style={{ color: accentColor, fontFamily: "var(--font-body)" }}
        >
          {readMoreLabel} →
        </p>
      </div>
    </article>
  );
}

export default function ExperiencesCarousel() {
  const { t } = useTranslation();
  const { accentColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();
  const isMd = useMediaQuery("(min-width: 768px)");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const dotInactiveBg = useColorModeValue("#d1d5db", "rgba(255, 255, 255, 0.3)");

  const items = experiences.map((exp) => ({
    slug: exp.slug,
    imageSrc: exp.image,
    title: t(`experiences.items.${exp.slug}.title`),
    subtitle: t(`experiences.items.${exp.slug}.subtitle`),
    date: t(`experiences.items.${exp.slug}.date`),
    summary: t(`experiences.items.${exp.slug}.summary`),
  }));

  const count = items.length;
  const goTo = (next) => setCurrentIndex(((next % count) + count) % count);

  useEffect(() => {
    if (prefersReducedMotion || paused) return undefined;

    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % count);
    }, 3500);

    return () => clearTimeout(timeout);
  }, [prefersReducedMotion, paused, currentIndex, count]);

  const getVisibleCards = () => {
    if (!isMd) return [{ ...items[currentIndex], opacity: 1 }];

    const prevIndex = (currentIndex - 1 + count) % count;
    const nextIndex = (currentIndex + 1) % count;
    return [
      { ...items[prevIndex], opacity: 0.45, inactive: true },
      { ...items[currentIndex], opacity: 1 },
      { ...items[nextIndex], opacity: 0.45, inactive: true },
    ];
  };

  const visibleCards = getVisibleCards();
  const readMoreLabel = t("experiences.read_more");

  return (
    <MotionDiv
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
      viewport={{ once: true }}
      className="w-full overflow-x-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label={t("experiences.title")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mb-6">
        <h2
          className="text-xl font-extrabold tracking-tight md:text-2xl"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
        >
          {t("experiences.title")}
        </h2>
      </div>

      <div
        className={cn(
          "flex w-full gap-4 pb-2 md:justify-center md:overflow-visible md:px-0 md:pb-0",
          isMd ? "justify-center overflow-visible px-0" : "justify-center overflow-hidden px-0",
        )}
        style={{ scrollbarWidth: "thin", WebkitOverflowScrolling: "touch" }}
      >
        {visibleCards.map((exp) => (
          <MotionDiv
            key={exp.slug}
            className={isMd ? "shrink-0" : "w-full min-w-0"}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: exp.opacity, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
          >
            <ExperienceCard {...exp} readMoreLabel={readMoreLabel} fitViewport={!isMd} />
          </MotionDiv>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label={t("experiences.carousel_prev")}
          onClick={() => goTo(currentIndex - 1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-transparent p-0 transition-colors"
          style={{ color: accentColor, borderColor: `${accentColor}50` }}
          onMouseEnter={(event) => {
            event.currentTarget.style.backgroundColor = `${accentColor}15`;
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>

        <div className="flex items-center gap-2">
          {items.map((exp, index) => (
            <button
              key={exp.slug}
              type="button"
              aria-label={exp.title}
              aria-current={index === currentIndex ? "true" : undefined}
              onClick={() => goTo(index)}
              className="h-2 cursor-pointer rounded-full border-none p-0 transition-all duration-[250ms] ease-in-out"
              style={{
                width: index === currentIndex ? "20px" : "8px",
                backgroundColor: index === currentIndex ? accentColor : dotInactiveBg,
              }}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label={t("experiences.carousel_next")}
          onClick={() => goTo(currentIndex + 1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-transparent p-0 transition-colors"
          style={{ color: accentColor, borderColor: `${accentColor}50` }}
          onMouseEnter={(event) => {
            event.currentTarget.style.backgroundColor = `${accentColor}15`;
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>

      <span className="sr-only" aria-live="polite">
        {items[currentIndex].title}
      </span>
    </MotionDiv>
  );
}
