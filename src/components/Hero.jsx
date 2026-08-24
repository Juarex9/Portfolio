import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useColorModeValue } from "../hooks/useColorModeValue.js";
import BlurText from "./react-bits/BlurText.jsx";
import { Badge } from "./ui/badge.jsx";

const MotionDiv = motion.div;

const floatingOrbs = [
  { size: { base: 150, md: 300 }, x: { base: "70%", md: "80%" }, y: { base: "5%", md: "10%" } },
  { size: { base: 120, md: 200 }, x: { base: "-20%", md: "10%" }, y: { base: "50%", md: "60%" } },
  { size: { base: 100, md: 150 }, x: { base: "50%", md: "70%" }, y: { base: "60%", md: "70%" } },
];

export default function Hero() {
  const { accentColor } = useAccentColors();
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const nameColor = useColorModeValue("#000000", "#ffffff");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section className="relative w-full overflow-hidden py-12 md:min-h-[calc(100vh-72px)] md:py-0">
      {!prefersReducedMotion && floatingOrbs.map((orb, i) => (
        <MotionDiv
          key={i}
          className="absolute rounded-full blur-[60px]"
          style={{
            width: orb.size.base,
            height: orb.size.base,
            background: `linear-gradient(135deg, ${accentColor}30, ${accentColor}10)`,
            left: orb.x.base,
            top: orb.y.base,
            zIndex: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
        />
      ))}

      <div className="relative z-[2] mx-auto max-w-6xl px-4 md:px-6">
        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex min-h-0 items-center py-8 md:min-h-[calc(100vh-72px)] md:py-12"
        >
          <div className="flex w-full flex-col-reverse items-center justify-between gap-8 lg:flex-row lg:gap-12">
            <MotionDiv variants={itemVariants} className="flex-1 text-center lg:text-left">
              <div className="mb-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                <Badge className="normal-case" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
                  {t("hero.availability")}
                </Badge>
              </div>

              <h1
                className="mb-4 text-[2.5rem] font-extrabold leading-[1.1] sm:text-3xl md:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="block" style={{ color: nameColor }}>
                  {t("hero.title_1")}
                </span>
                <span className="block">
                  {prefersReducedMotion ? (
                    <span
                      className="bg-clip-text text-transparent"
                      style={{ backgroundImage: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` }}
                    >
                      {t("hero.title_name")}
                    </span>
                  ) : (
                    <BlurText
                      text={t("hero.title_name")}
                      delay={80}
                      className="font-extrabold"
                      segmentClassName="bg-clip-text text-transparent"
                      segmentStyle={{
                        backgroundImage: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                      }}
                    />
                  )}
                </span>
              </h1>

              <p
                className="mb-6 max-w-xl text-sm leading-[1.7] text-gray-500 sm:text-base md:text-lg"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t("hero.subtitle")}
              </p>

              <div className="flex w-full flex-col items-stretch justify-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                <RouterLink
                  to="/contacto"
                  className="inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: accentColor, fontFamily: "var(--font-body)" }}
                >
                  {t("hero.btn_contact")}
                </RouterLink>
                <RouterLink
                  to="/proyectos"
                  className="inline-flex h-10 items-center justify-center rounded-full border bg-transparent px-5 text-sm font-semibold transition-all hover:opacity-90"
                  style={{
                    color: accentColor,
                    borderColor: `${accentColor}50`,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {t("hero.btn_projects")}
                </RouterLink>
              </div>
            </MotionDiv>

            <MotionDiv
              variants={itemVariants}
              className="relative flex shrink-0 items-center justify-center overflow-visible"
              animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
              transition={prefersReducedMotion ? {} : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="h-[160px] w-[160px] overflow-hidden rounded-full md:h-[220px] md:w-[220px] lg:h-[260px] lg:w-[260px]">
                <img
                  src="./mirando-al-horizonte-modified.png"
                  alt="Agustín Juárez"
                  className="h-full w-full object-cover"
                />
              </div>
            </MotionDiv>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
