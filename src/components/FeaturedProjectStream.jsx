import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useStreamLayout } from "../hooks/useStreamLayout.js";
import { computeScannerClip, getProjectCodeOverlay } from "./featuredStreamUtils.js";
import { getProjectDetailPath } from "../data/projects.js";
import { cn } from "@/lib/utils";

function FeaturedStreamCard({
  cardRef,
  project,
  clipRight,
  clipLeft,
  scanning,
  accentColor,
  borderColor,
  cardWidth,
  compact,
  t,
}) {
  const baseKey = `projects.items.${project.key}`;
  const title = t(`${baseKey}.title`);
  const description = t(`${baseKey}.description`);
  const tech = t(`${baseKey}.tech`, { returnObjects: true });
  const code = getProjectCodeOverlay(project.key, title, tech);
  const detailPath = getProjectDetailPath(project);
  const primaryLink = detailPath || project.demo || project.github || "/proyectos";

  const linkClassName = cn(
    "static font-bold text-white no-underline after:absolute after:inset-0 hover:no-underline",
    "text-sm md:text-base",
  );

  return (
    <article
      className="group relative max-w-full"
      style={{
        flex: cardWidth ? `0 0 ${cardWidth}px` : "1 1 auto",
        width: cardWidth ? `${cardWidth}px` : "100%",
      }}
    >
      <div
        ref={cardRef}
        className={cn(
          "relative h-[170px] overflow-hidden rounded-xl border bg-black sm:h-[190px] md:h-[220px]",
          "transition-[border-color,box-shadow] duration-200 ease-in-out",
          !scanning && "shadow-md",
        )}
        style={{
          borderColor: scanning ? accentColor : borderColor,
          boxShadow: scanning ? `0 0 32px ${accentColor}44` : undefined,
        }}
      >
        <div
          className="featured-card-normal absolute inset-0"
          style={{ "--clip-right": `${clipRight}%` }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={title}
              className="h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            <div
              className="h-full w-full"
              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}99)` }}
            />
          )}
        </div>

        <div
          className="featured-card-overlay absolute inset-0"
          style={{ "--clip-left": `${clipLeft}%` }}
        >
          <pre
            className={cn(
              "m-0 h-full overflow-hidden p-3 whitespace-pre-wrap",
              "text-[9px] leading-[1.35] md:text-[10px]",
              scanning && "featured-code-glitch",
            )}
            style={{
              fontFamily: "var(--font-mono)",
              color: `${accentColor}cc`,
            }}
          >
            {code}
          </pre>
        </div>

        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent 55%)" }}
        />

        <div className="absolute right-3 bottom-3 left-3 z-[2]">
          <span
            className="mb-2 inline-block rounded-full px-2 py-0.5 text-xs"
            style={{ backgroundColor: `${accentColor}22`, color: accentColor }}
          >
            {t(`projects.types.${project.type}`)}
          </span>
          <h3
            className="text-sm font-bold text-white md:text-base"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {primaryLink.startsWith("http") ? (
              <a
                href={primaryLink}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = accentColor;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = "white";
                }}
              >
                {title}
              </a>
            ) : (
              <RouterLink
                to={primaryLink}
                className={linkClassName}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = accentColor;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = "white";
                }}
              >
                {title}
              </RouterLink>
            )}
          </h3>
        </div>
      </div>

      {!compact && (
        <p
          className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-500"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {description}
        </p>
      )}
    </article>
  );
}

export default function FeaturedProjectStream({ projects, accentColor, borderColor }) {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const positionRef = useRef(0);
  const dragRef = useRef({ active: false, startX: 0, startPos: 0 });
  const autoScrollRef = useRef(true);

  const { cardWidth, cardGap, cardStep, isMobile } = useStreamLayout(containerRef);
  const streamProjects = useMemo(() => [...projects, ...projects, ...projects], [projects]);
  const loopWidth = projects.length * cardStep;

  const [clips, setClips] = useState(() => streamProjects.map(() => ({ clipRight: 0, clipLeft: 0, scanning: false })));

  const applyTrackTransform = useCallback((value) => {
    positionRef.current = value;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${value}px)`;
    }
  }, []);

  useEffect(() => {
    if (loopWidth > 0) {
      applyTrackTransform(-loopWidth);
    }
  }, [loopWidth, applyTrackTransform]);

  const wrapPosition = useCallback(
    (value) => {
      if (loopWidth <= 0) return value;
      if (value < -loopWidth * 2) return value + loopWidth;
      if (value > 0) return value - loopWidth;
      return value;
    },
    [loopWidth],
  );

  const updateClips = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const scannerX = container.getBoundingClientRect().left + container.clientWidth / 2;
    const next = cardRefs.current.map((node) => {
      if (!node) return { clipRight: 0, clipLeft: 0, scanning: false };
      return computeScannerClip(node.getBoundingClientRect(), scannerX);
    });

    setClips((prev) => {
      const changed = next.some((clip, index) => (
        clip.clipRight !== prev[index]?.clipRight
        || clip.clipLeft !== prev[index]?.clipLeft
        || clip.scanning !== prev[index]?.scanning
      ));
      return changed ? next : prev;
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || loopWidth <= 0) return undefined;
    let frameId = 0;

    const tick = () => {
      if (autoScrollRef.current && !dragRef.current.active) {
        const next = wrapPosition(positionRef.current - (isMobile ? 0.25 : 0.35));
        if (next !== positionRef.current) {
          applyTrackTransform(next);
        }
      }
      updateClips();
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [prefersReducedMotion, updateClips, wrapPosition, loopWidth, isMobile, applyTrackTransform]);

  useEffect(() => {
    const onResize = () => updateClips();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateClips]);

  const onPointerDown = (event) => {
    if (prefersReducedMotion) return;
    dragRef.current = { active: true, startX: event.clientX, startPos: positionRef.current };
    autoScrollRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!dragRef.current.active) return;
    const delta = event.clientX - dragRef.current.startX;
    const next = wrapPosition(dragRef.current.startPos + delta);
    applyTrackTransform(next);
  };

  const onPointerUp = (event) => {
    dragRef.current.active = false;
    autoScrollRef.current = true;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onWheel = (event) => {
    if (prefersReducedMotion) return;
    event.preventDefault();
    autoScrollRef.current = false;
    const delta = event.deltaY > 0 ? -24 : 24;
    const next = wrapPosition(positionRef.current + delta);
    applyTrackTransform(next);
    window.setTimeout(() => {
      autoScrollRef.current = true;
    }, 1800);
  };

  if (prefersReducedMotion) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <FeaturedStreamCard
            key={project.key}
            project={project}
            clipRight={0}
            clipLeft={0}
            scanning={false}
            accentColor={accentColor}
            borderColor={borderColor}
            t={t}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative mt-4 w-full max-w-full">
      <div
        ref={containerRef}
        className="relative w-full min-h-[210px] overflow-hidden sm:min-h-[230px] md:min-h-[260px]"
        onPointerEnter={() => { autoScrollRef.current = false; }}
        onPointerLeave={() => { autoScrollRef.current = true; }}
      >
        <div
          className="featured-scanner-beam"
          style={{ "--scanner-color": accentColor }}
          aria-hidden="true"
        >
          <span className="featured-scanner-label" style={{ color: accentColor }}>
            scan
          </span>
        </div>

        <div
          ref={trackRef}
          className="featured-card-track flex cursor-grab select-none items-start active:cursor-grabbing"
          style={{
            gap: `${cardGap}px`,
            paddingLeft: `calc(50% - ${cardWidth / 2}px)`,
            paddingRight: `calc(50% - ${cardWidth / 2}px)`,
            touchAction: "pan-y",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onWheel={onWheel}
        >
          {streamProjects.map((project, index) => (
            <FeaturedStreamCard
              key={`${project.key}-${index}`}
              cardRef={(node) => {
                cardRefs.current[index] = node;
              }}
              project={project}
              clipRight={clips[index]?.clipRight ?? 0}
              clipLeft={clips[index]?.clipLeft ?? 0}
              scanning={clips[index]?.scanning ?? false}
              accentColor={accentColor}
              borderColor={borderColor}
              cardWidth={cardWidth}
              compact
              t={t}
            />
          ))}
        </div>
      </div>

      <p
        className="mt-4 px-2 text-center text-xs text-gray-500"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {t("featured.stream_hint")}
      </p>
    </div>
  );
}
