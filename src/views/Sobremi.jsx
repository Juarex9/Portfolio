import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useLocalizedRoutes } from "../i18n/LocaleContext.jsx";
import ExperiencesCarousel from "../components/ExperiencesCarousel";
import { Badge } from "@/components/ui/badge";

const MotionDiv = motion.div;

const AboutMe = () => {
  const { accentColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();
  const { routeFor } = useLocalizedRoutes();
  const cvHref = t("about.cta_cv_href");
  const cvUrl = cvHref.startsWith("/") ? cvHref : `/${cvHref.replace("./", "")}`;

  return (
    <>
      <div className="min-h-screen w-full overflow-x-hidden bg-transparent">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-16">
          <div className="mb-8 md:mb-12">
            <MotionDiv
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.15 }}
              className="mx-auto mb-8 w-fit md:float-right md:mb-4 md:ml-10"
            >
              <div
                className="h-32 w-32 overflow-hidden rounded-full sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-48 lg:w-48"
                style={{ boxShadow: `0 0 0 3px ${accentColor}40` }}
              >
                <img
                  src="/mirando-al-horizonte-modified.webp"
                  alt="Agustín Juárez"
                  className="h-full w-full object-cover"
                />
              </div>
            </MotionDiv>

            <MotionDiv
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
              viewport={{ once: true }}
              className="min-w-0"
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

              <p className="max-w-2xl text-sm text-muted-foreground md:text-base" style={{ fontFamily: "var(--font-body)" }}>
                {t("about.context")}
              </p>
            </MotionDiv>

            <div className="mt-8 flex max-w-3xl flex-col items-start gap-4">
              {["p1", "p2", "p3"].map((key) => (
                <p
                  key={key}
                  className="text-sm leading-relaxed text-muted-foreground md:text-base"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {t(`about.${key}`)}
                </p>
              ))}
            </div>
          </div>

          <div className="mb-8 flex flex-col gap-10 md:mb-12 md:gap-14">
            {["community", "ai", "web3"].map((key, index) => {
              const paragraphs = t(`about.${key}.paragraphs`, { returnObjects: true });
              const paragraphList = Array.isArray(paragraphs) ? paragraphs : [paragraphs];
              return (
                <MotionDiv
                  key={key}
                  className="w-full"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <section className="border-l-[3px] pl-4 md:pl-6" style={{ borderColor: accentColor }}>
                    <h2
                      className="mb-3 text-lg font-bold tracking-tight md:text-2xl"
                      style={{ fontFamily: "var(--font-display)", color: accentColor }}
                    >
                      {t(`about.${key}.title`)}
                    </h2>
                    <div className="flex max-w-3xl flex-col gap-4">
                      {paragraphList.map((paragraph, i) => (
                        <p
                          key={i}
                          className="text-sm leading-relaxed text-muted-foreground md:text-base"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {paragraph}
                        </p>
                      ))}
                      {key === "community" && (
                        <a
                          href="https://salta.dev"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold underline decoration-dotted underline-offset-4 md:text-base"
                          style={{ color: accentColor, fontFamily: "var(--font-body)" }}
                        >
                          salta.dev
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </section>
                </MotionDiv>
              );
            })}
          </div>

          <div className="mt-8 md:mt-12">
            <ExperiencesCarousel />
          </div>

          <MotionDiv
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-col items-center gap-4 text-center md:mt-16"
          >
            <h2
              className="text-xl font-extrabold tracking-tight md:text-2xl"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              {t("about.cta_title")}
            </h2>
            <p
              className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t("about.cta_text")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <a
                href={routeFor("contact")}
                className="inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
                style={{ backgroundColor: accentColor, fontFamily: "var(--font-body)" }}
              >
                {t("about.cta_contact")}
              </a>
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full border bg-transparent px-5 text-sm font-semibold no-underline transition-all hover:opacity-90"
                style={{
                  color: accentColor,
                  borderColor: `${accentColor}50`,
                  fontFamily: "var(--font-body)",
                }}
              >
                <Download size={16} />
                {t("about.cta_cv")}
              </a>
            </div>
          </MotionDiv>
        </div>
      </div>
    </>
  );
};

export default AboutMe;
