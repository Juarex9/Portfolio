import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAccentColors } from "../hooks/useAccentColors";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { experiences } from "../data/experiences.js";
import { useColorModeValue } from "../hooks/useColorModeValue.js";
import { cn } from "@/lib/utils";

const MotionDiv = motion.div;

function ExperienceCard({ slug, title, subtitle, date, summary, imageSrc, opacity = 1, readMoreLabel, fitViewport = false }) {
  const { accentColor } = useAccentColors();
  const cardBg = useColorModeValue("#ffffff", "#111827");
  const cardBorderColor = useColorModeValue("#e5e7eb", "#374151");

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl border transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg",
        fitViewport ? "w-full max-w-full min-w-0" : "max-w-[360px] min-w-[260px] md:min-w-[300px]",
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
          <RouterLink
            to={`/experiencias/${slug}`}
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
          </RouterLink>
        </h3>

        <p className="text-xs font-semibold" style={{ color: accentColor }}>
          {subtitle}
        </p>

        <p className="text-xs text-gray-500">{date}</p>

        <p className="line-clamp-3 text-sm leading-relaxed text-gray-500">{summary}</p>

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
  const prefersReducedMotion = useReducedMotion();
  const isMd = useMediaQuery("(min-width: 768px)");
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = experiences.map((exp) => ({
    slug: exp.slug,
    imageSrc: exp.image,
    title: t(`experiences.items.${exp.slug}.title`),
    subtitle: t(`experiences.items.${exp.slug}.subtitle`),
    date: t(`experiences.items.${exp.slug}.date`),
    summary: t(`experiences.items.${exp.slug}.summary`),
  }));

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, items.length]);

  const getVisibleCards = () => {
    if (!isMd) return [{ ...items[currentIndex], opacity: 1 }];
    if (prefersReducedMotion) return items.map((item) => ({ ...item, opacity: 1 }));

    const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    return [
      { ...items[prevIndex], opacity: 0.45 },
      { ...items[currentIndex], opacity: 1 },
      { ...items[nextIndex], opacity: 0.45 },
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
            transition={{ duration: 0.35 }}
          >
            <ExperienceCard {...exp} readMoreLabel={readMoreLabel} fitViewport={!isMd} />
          </MotionDiv>
        ))}
      </div>
    </MotionDiv>
  );
}
