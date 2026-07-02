import React, { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAccentColors } from "../hooks/useAccentColors";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useColorModeValue } from "../hooks/useColorModeValue.js";
import { cn } from "@/lib/utils";

const MotionDiv = motion.div;

function galleryAltKey(src) {
  const filename = src.split("/").pop() || "";
  return filename.replace(/\.[^.]+$/, "").toLowerCase();
}

export default function ExperienceGallery({ images, title, getAlt, borderColor }) {
  const { t } = useTranslation();
  const { accentColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();
  const imageBg = useColorModeValue("#f9fafb", "#1f2937");
  const navBtnBg = useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(0, 0, 0, 0.6)");
  const navBtnHoverBg = useColorModeValue("#ffffff", "#374151");
  const dotInactiveBg = useColorModeValue("#d1d5db", "rgba(255, 255, 255, 0.3)");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const count = images.length;

  const goTo = useCallback(
    (next) => {
      if (next < 0) {
        setActiveIndex(count - 1);
        return;
      }
      if (next >= count) {
        setActiveIndex(0);
        return;
      }
      setActiveIndex(next);
    },
    [count],
  );

  const activeSrc = images[activeIndex];
  const activeAlt = getAlt(galleryAltKey(activeSrc));

  if (prefersReducedMotion) {
    return (
      <div className="mb-8 flex w-full flex-col gap-4">
        {title && (
          <h2
            className="text-sm text-gray-500"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
        )}
        <div
          className="flex w-full gap-4 overflow-x-auto pb-3"
          style={{ scrollbarWidth: "thin", WebkitOverflowScrolling: "touch" }}
        >
          {images.map((src) => (
            <div
              key={src}
              className="w-[min(300px,88vw)] shrink-0 overflow-hidden rounded-xl border md:w-[420px]"
              style={{ borderColor, backgroundColor: imageBg }}
            >
              <img
                src={src}
                alt={getAlt(galleryAltKey(src))}
                className="h-auto w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 flex w-full flex-col gap-4">
      {title && (
        <h2
          className="text-sm text-gray-500"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h2>
      )}

      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl border",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
        style={{ borderColor, backgroundColor: imageBg, touchAction: "pan-y" }}
        role="region"
        aria-roledescription="carousel"
        aria-label={title}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") goTo(activeIndex - 1);
          if (event.key === "ArrowRight") goTo(activeIndex + 1);
        }}
        onPointerDown={(event) => {
          setIsDragging(true);
          dragStartX.current = event.clientX;
        }}
        onPointerMove={(event) => {
          if (!isDragging) return;
          const delta = event.clientX - dragStartX.current;
          if (Math.abs(delta) > 56) {
            goTo(activeIndex + (delta > 0 ? -1 : 1));
            dragStartX.current = event.clientX;
          }
        }}
        onPointerUp={() => setIsDragging(false)}
        onPointerLeave={() => setIsDragging(false)}
      >
        <div className="relative flex min-h-[240px] items-center justify-center px-10 py-4 sm:min-h-[320px] md:min-h-[420px] md:px-12">
          <AnimatePresence mode="wait" initial={false}>
            <MotionDiv
              key={activeSrc}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
              className="flex w-full justify-center"
            >
              <img
                src={activeSrc}
                alt={activeAlt}
                className="h-auto max-h-[360px] w-auto max-w-full object-contain md:max-h-[520px]"
                loading="eager"
              />
            </MotionDiv>
          </AnimatePresence>
        </div>

        <button
          type="button"
          aria-label={t("experiences.gallery_prev")}
          onClick={() => goTo(activeIndex - 1)}
          className="absolute left-1 top-1/2 z-[2] inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-none p-0 transition-colors md:left-2"
          style={{ color: accentColor, backgroundColor: navBtnBg }}
          onMouseEnter={(event) => {
            event.currentTarget.style.backgroundColor = navBtnHoverBg;
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor = navBtnBg;
          }}
        >
          <ChevronLeft className="h-6 w-6" aria-hidden />
        </button>
        <button
          type="button"
          aria-label={t("experiences.gallery_next")}
          onClick={() => goTo(activeIndex + 1)}
          className="absolute right-1 top-1/2 z-[2] inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-none p-0 transition-colors md:right-2"
          style={{ color: accentColor, backgroundColor: navBtnBg }}
          onMouseEnter={(event) => {
            event.currentTarget.style.backgroundColor = navBtnHoverBg;
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor = navBtnBg;
          }}
        >
          <ChevronRight className="h-6 w-6" aria-hidden />
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p
          className="line-clamp-2 flex-1 text-sm text-gray-500"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {activeAlt}
        </p>
        <p
          className="shrink-0 text-xs tracking-wider text-gray-500"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
      </div>

      <div className="flex justify-center gap-2">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            aria-label={getAlt(galleryAltKey(src))}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
            className="h-2 cursor-pointer rounded-full border-none p-0 transition-all duration-[250ms] ease-in-out"
            style={{
              width: index === activeIndex ? "20px" : "8px",
              backgroundColor: index === activeIndex ? accentColor : dotInactiveBg,
            }}
          />
        ))}
      </div>

      <span className="sr-only" aria-live="polite">
        {activeAlt}
      </span>
    </div>
  );
}
