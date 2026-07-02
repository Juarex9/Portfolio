import { useMemo } from "react";
import { motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";
import { useReducedMotion } from "../hooks/useReducedMotion";
import {
  SiJavascript,
  SiHtml5,
  SiCss,
  SiPython,
  SiReact,
  SiExpress,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";

const MotionDiv = motion.div;

export default function TechMarquee({ speedSeconds = 22, title = "Tech stack", showTitle = true }) {
  const { accentColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();

  const items = useMemo(
    () => [
      { label: "JavaScript", Icon: SiJavascript },
      { label: "TypeScript", Icon: SiTypescript },
      { label: "HTML5", Icon: SiHtml5 },
      { label: "CSS3", Icon: SiCss },
      { label: "Python", Icon: SiPython },
      { label: "React", Icon: SiReact },
      { label: "Tailwind CSS", Icon: SiTailwindcss },
      { label: "Node.js", Icon: SiNodedotjs },
      { label: "Express", Icon: SiExpress },
      { label: "PostgreSQL", Icon: SiPostgresql },
      { label: "MongoDB", Icon: SiMongodb },
      { label: "Git", Icon: SiGit },
    ],
    [],
  );

  const loop = [...items, ...items];

  return (
    <section className="w-full bg-transparent py-6 md:py-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {showTitle && (
          <div className="mb-3 flex items-center gap-2">
            <span className="h-0.5 w-5 rounded-full" style={{ backgroundColor: accentColor }} />
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: accentColor, fontFamily: "var(--font-body)" }}
            >
              {title}
            </span>
          </div>
        )}

        <div className="overflow-hidden">
          <MotionDiv
            className="flex w-max gap-2 md:gap-3"
            animate={prefersReducedMotion ? { x: 0 } : { x: ["0%", "-50%"] }}
            transition={{
              duration: speedSeconds,
              ease: "linear",
              repeat: prefersReducedMotion ? 0 : Infinity,
            }}
          >
            {loop.map((item, idx) => (
              <div
                key={`${item.label}-${idx}`}
                className="flex shrink-0 cursor-default select-none items-center gap-1.5 rounded-lg px-2 py-1.5 md:px-3 md:py-2"
              >
                <item.Icon className="text-sm md:text-base" style={{ color: accentColor }} />
                <span
                  className="whitespace-nowrap text-xs font-medium text-gray-500 md:text-sm"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
