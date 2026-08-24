import { lazy, Suspense, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useColorModeValue } from "../hooks/useColorModeValue.js";
import { getProjectDetailPath } from "../data/projects.js";

const CircularGallery = lazy(() => import("./react-bits/CircularGallery.jsx"));

function GalleryFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
    </div>
  );
}

export default function FeaturedCircularGallery({ projects, accentColor, borderColor }) {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const textColor = useColorModeValue("#0f172a", "#f1f5f9");

  const projectsWithImages = useMemo(
    () => projects.filter((project) => project.image),
    [projects],
  );

  const galleryItems = useMemo(
    () => projectsWithImages.map((project) => ({
      image: project.image,
      text: t(`projects.items.${project.key}.title`),
    })),
    [projectsWithImages, t],
  );

  if (prefersReducedMotion || !isDesktop) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projectsWithImages.map((project) => {
          const title = t(`projects.items.${project.key}.title`);
          const detailPath = getProjectDetailPath(project);
          const href = detailPath || project.demo || project.github || "/proyectos";
          const isExternal = href.startsWith("http");

          return (
            <article key={project.key}>
              <div className="overflow-hidden rounded-xl border" style={{ borderColor }}>
                <img src={project.image} alt={title} className="aspect-video w-full object-cover" />
              </div>
              <h3 className="mt-3 text-base font-bold" style={{ fontFamily: "var(--font-display)" }}>
                {isExternal ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="hover:opacity-80" style={{ color: accentColor }}>
                    {title}
                  </a>
                ) : (
                  <RouterLink to={href} className="hover:opacity-80" style={{ color: accentColor }}>
                    {title}
                  </RouterLink>
                )}
              </h3>
            </article>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <div className="relative -mx-4 h-[420px] w-[calc(100%+2rem)] sm:h-[480px] md:mx-0 md:h-[540px] md:w-full">
        <Suspense fallback={<GalleryFallback />}>
          <CircularGallery
            items={galleryItems}
            bend={2.5}
            textColor={textColor}
            borderRadius={0.06}
            font="bold 26px Syne"
            fontUrl="https://fonts.googleapis.com/css2?family=Syne:wght@700&display=swap"
            scrollSpeed={2}
            scrollEase={0.05}
          />
        </Suspense>
      </div>
      <p className="mt-4 px-2 text-center text-xs text-gray-500" style={{ fontFamily: "var(--font-body)" }}>
        {t("featured.gallery_hint")}
      </p>
    </>
  );
}
