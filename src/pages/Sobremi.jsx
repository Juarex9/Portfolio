import { motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";
import { useReducedMotion } from "../hooks/useReducedMotion";
import ExperiencesCarousel from "../components/ExperiencesCarousel";
import { Badge } from "@/components/ui/badge";

const MotionDiv = motion.div;

const AboutMe = () => {
  const { accentColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();

  return (
    <>
      <Seo titleKey="seo.about.title" descriptionKey="seo.about.description" canonicalPath="/sobremi" />
      <div className="min-h-screen w-full overflow-x-hidden bg-transparent">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-16">
          <MotionDiv
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="mb-3 flex flex-row items-center gap-2">
              <span className="h-0.5 w-8 rounded-full" style={{ backgroundColor: accentColor }} />
              <Badge
                className="normal-case"
                style={{ backgroundColor: `${accentColor}15`, color: accentColor, fontFamily: "var(--font-body)" }}
              >
                {t("about.badge")}
              </Badge>
            </div>

            <h1
              className="mb-2 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("about.heading")}
            </h1>

            <p className="max-w-2xl text-sm text-gray-500 md:text-base" style={{ fontFamily: "var(--font-body)" }}>
              {t("about.context")}
            </p>
          </MotionDiv>

          <div className="mb-8 flex max-w-3xl flex-col items-start gap-6 md:mb-12 md:gap-8">
            <p className="text-sm leading-relaxed text-gray-500 md:text-base" style={{ fontFamily: "var(--font-body)" }}>
              {t("about.p1")}
            </p>
            <p className="text-sm leading-relaxed text-gray-500 md:text-base" style={{ fontFamily: "var(--font-body)" }}>
              {t("about.p2")}
            </p>

            {["card2", "card3", "card1"].map((key, index) => (
              <MotionDiv
                key={key}
                className="w-full"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.08 }}
                viewport={{ once: true }}
              >
                <section className="border-l-[3px] pl-4 md:pl-5" style={{ borderColor: accentColor }}>
                  <h2
                    className="mb-2 text-lg font-bold tracking-tight md:text-xl"
                    style={{ fontFamily: "var(--font-display)", color: accentColor }}
                  >
                    {t(`about.${key}.title`)}
                  </h2>
                  <p
                    className="text-sm leading-relaxed text-gray-500 md:text-base"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {t(`about.${key}.text`)}
                  </p>
                </section>
              </MotionDiv>
            ))}
          </div>

          <div className="mt-8 md:mt-12">
            <ExperiencesCarousel />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutMe;
