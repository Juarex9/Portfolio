import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";
import { useColorModeValue } from "../hooks/useColorModeValue.js";
import styles from "../styles/waterfall.module.css";

const MotionSpan = motion.span;

export default function Web3ComingSoonFlipWords() {
  const { accentColor, bgColor, cardBg } = useAccentColors();
  const muted = useColorModeValue("rgba(0, 0, 0, 0.64)", "rgba(255, 255, 255, 0.64)");
  const borderColor = useColorModeValue("rgba(0, 0, 0, 0.08)", "rgba(255, 255, 255, 0.08)");

  const words = useMemo(
    () => ["dApps", "Smart contracts", "Indexación", "Integraciones", "Casos de estudio"],
    [],
  );
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % words.length), 1800);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <section className="py-14 md:py-[58px]" style={{ backgroundColor: bgColor }}>
      <div className="mx-auto min-h-[60vh] max-w-3xl px-4 md:px-6">
        <div className="flex flex-col items-center gap-5 text-center">
          <div
            className="w-full max-w-2xl rounded-2xl border px-6 py-6 md:px-8 md:py-7"
            style={{ borderColor, backgroundColor: cardBg }}
          >
            <h2 className="text-2xl font-bold tracking-tight md:text-4xl" style={{ letterSpacing: "-0.02em" }}>
              En desarrollo
            </h2>

            <div className="mt-5 flex justify-center" style={{ "--primary": accentColor }}>
              <div className={styles.waterfall} aria-hidden="true">
                <div />
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>

            <p className="mt-5 text-base md:text-lg" style={{ color: muted }}>
              Estoy preparando:{" "}
              <span className="relative inline-block font-semibold" style={{ color: accentColor }}>
                <AnimatePresence mode="wait">
                  <MotionSpan
                    key={words[idx]}
                    className="inline-block"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {words[idx]}
                  </MotionSpan>
                </AnimatePresence>
              </span>
            </p>

            <p className="mt-5 text-sm" style={{ color: muted }}>
              Proximamente estarán listos los primeros proyectos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
