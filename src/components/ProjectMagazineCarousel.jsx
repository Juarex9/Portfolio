import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useBreakpointValue } from "../hooks/useBreakpointValue.js";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useColorModeValue } from "../hooks/useColorModeValue.js";
import { cn } from "@/lib/utils";

const MotionDiv = motion.div;

const SPRING = { type: "spring", stiffness: 280, damping: 32, mass: 0.8 };

function getCardTransform(index, activeIndex, introProgress, metrics) {
  const offset = index - activeIndex;
  const spread = introProgress;
  const abs = Math.abs(offset);

  return {
    x: offset * metrics.xStep * spread,
    z: -abs * metrics.zStep * spread,
    rotateY: offset * -metrics.rotateStep * spread,
    scale: (1 - abs * 0.07) * (0.88 + 0.12 * spread),
    opacity: Math.max(0.35, 1 - abs * 0.22),
    zIndex: 10 - abs,
  };
}

export default function ProjectMagazineCarousel({ images, accentColor }) {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const framerReducedMotion = useFramerReducedMotion();
  const reducedMotion = prefersReducedMotion || framerReducedMotion;
  const inactiveBorderColor = useColorModeValue("rgba(0, 0, 0, 0.08)", "rgba(255, 255, 255, 0.08)");
  const inactiveActiveBorderColor = useColorModeValue(`${accentColor}55`, `${accentColor}66`);
  const dotInactiveBg = useColorModeValue("#d1d5db", "rgba(255, 255, 255, 0.3)");

  const metrics = useBreakpointValue({
    base: { xStep: 64, zStep: 40, rotateStep: 20, cardW: 168, cardH: 112, offsetX: 84, offsetY: 56 },
    sm: { xStep: 88, zStep: 52, rotateStep: 26, cardW: 208, cardH: 138, offsetX: 104, offsetY: 69 },
    md: { xStep: 118, zStep: 72, rotateStep: 32, cardW: 260, cardH: 172, offsetX: 130, offsetY: 86 },
    lg: { xStep: 118, zStep: 72, rotateStep: 32, cardW: 300, cardH: 192, offsetX: 150, offsetY: 96 },
  }) ?? { xStep: 64, zStep: 40, rotateStep: 20, cardW: 168, cardH: 112, offsetX: 84, offsetY: 56 };

  const [activeIndex, setActiveIndex] = useState(0);
  const [introProgress, setIntroProgress] = useState(reducedMotion ? 1 : 0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const containerRef = useRef(null);
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

  useEffect(() => {
    if (reducedMotion) return undefined;
    const timer = setTimeout(() => setIntroProgress(1), 120);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || reducedMotion) return undefined;

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
      event.preventDefault();
      goTo(activeIndex + (event.deltaY > 0 ? 1 : -1));
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [activeIndex, goTo, reducedMotion]);

  const onPointerDown = (event) => {
    if (reducedMotion) return;
    setIsDragging(true);
    dragStartX.current = event.clientX;
  };

  const onPointerMove = (event) => {
    if (!isDragging || reducedMotion) return;
    const delta = event.clientX - dragStartX.current;
    if (Math.abs(delta) > 72) {
      setActiveIndex((prev) => (delta > 0 ? (prev - 1 + count) % count : (prev + 1) % count));
      dragStartX.current = event.clientX;
    }
  };

  const onPointerUp = () => setIsDragging(false);

  if (reducedMotion) {
    return (
      <div
        className="flex w-full max-w-full gap-4 overflow-x-auto pb-3"
        style={{ scrollbarWidth: "thin", WebkitOverflowScrolling: "touch" }}
      >
        {images.map((img) => (
          <div
            key={img.src}
            className="w-[min(220px,78vw)] shrink-0 overflow-hidden rounded-lg border md:w-[280px]"
            style={{ borderColor: inactiveBorderColor }}
          >
            <img src={img.src} alt={img.label} className="h-auto w-full" loading="lazy" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-full select-none overflow-hidden"
      style={{ touchAction: "pan-y" }}
    >
      <div
        className={cn(
          "relative mx-auto h-[200px] max-w-full px-2 sm:h-[240px] md:h-[300px] md:max-w-[640px] md:px-0 lg:h-[340px]",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
        style={{ perspective: "1400px", perspectiveOrigin: "50% 42%" }}
        tabIndex={0}
        role="region"
        aria-label={t("presentation.carousel_hint")}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") goTo(activeIndex - 1);
          if (event.key === "ArrowRight") goTo(activeIndex + 1);
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
          {images.map((img, index) => {
            const transform = getCardTransform(index, activeIndex, introProgress, metrics);
            const isActive = index === activeIndex;

            return (
              <MotionDiv
                key={img.src}
                className="absolute top-1/2 left-1/2 overflow-hidden rounded-md"
                style={{
                  width: `${metrics.cardW}px`,
                  marginLeft: `-${metrics.offsetX}px`,
                  marginTop: `-${metrics.offsetY}px`,
                  transformStyle: "preserve-3d",
                  zIndex: transform.zIndex,
                }}
                animate={{
                  x: transform.x,
                  z: transform.z,
                  rotateY: transform.rotateY,
                  scale: transform.scale,
                  opacity: transform.opacity,
                }}
                transition={SPRING}
              >
                <div
                  className="relative overflow-hidden rounded-md border"
                  style={{
                    borderColor: isActive ? inactiveActiveBorderColor : inactiveBorderColor,
                    boxShadow: isActive
                      ? `0 28px 60px -16px ${accentColor}55, 0 16px 40px rgba(0,0,0,0.28)`
                      : "0 12px 32px rgba(0,0,0,0.18)",
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 z-[1]"
                    style={{
                      background: "linear-gradient(to right, rgba(0,0,0,0.4), transparent 18%)",
                      opacity: isActive ? 0.35 : 0.55,
                    }}
                  />
                  <img
                    src={img.src}
                    alt={img.label}
                    className="block w-full object-cover"
                    style={{ height: `${metrics.cardH}px` }}
                    loading={index <= 1 ? "eager" : "lazy"}
                    draggable={false}
                  />
                  <div
                    className="absolute right-0 bottom-0 left-0 z-[2] px-3 py-2"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}
                  >
                    <p
                      className="line-clamp-1 text-xs font-bold tracking-tight text-white"
                      style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                    >
                      {img.label}
                    </p>
                  </div>
                </div>
              </MotionDiv>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2">
          <button
            type="button"
            aria-label={t("presentation.carousel_prev")}
            onClick={() => goTo(activeIndex - 1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border-none bg-transparent p-0 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
            style={{ color: accentColor }}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            aria-label={t("presentation.carousel_next")}
            onClick={() => goTo(activeIndex + 1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border-none bg-transparent p-0 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
            style={{ color: accentColor }}
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <p
          className="text-xs tracking-wider text-gray-500"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>

        <p
          className="hidden text-xs text-gray-500 md:block"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {t("presentation.carousel_hint")}
        </p>
      </div>

      <div className="mt-3 flex justify-center gap-2">
        {images.map((img, index) => (
          <button
            key={img.src}
            type="button"
            aria-label={img.label}
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
        {images[activeIndex]?.label}
      </span>
    </div>
  );
}
