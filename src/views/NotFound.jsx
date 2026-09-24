import { useTranslation } from "react-i18next";
import { useAccentColors } from "../hooks/useAccentColors";
import { useLocalizedRoutes } from "../i18n/LocaleContext.jsx";

export default function NotFound() {
  const { accentColor } = useAccentColors();
  const { t } = useTranslation();
  const { routeFor } = useLocalizedRoutes();

  return (
    <>
      <div className="flex min-h-[60vh] w-full items-center">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <div className="flex max-w-lg flex-col items-start gap-6">
            <p
              className="text-6xl font-extrabold leading-none"
              style={{ fontFamily: "var(--font-display)", color: accentColor }}
            >
              404
            </p>
            <h1
              className="text-2xl font-extrabold tracking-tight md:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("notFound.title")}
            </h1>
            <p className="leading-relaxed text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
              {t("notFound.description")}
            </p>
            <a
              href={routeFor("home")}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: accentColor, fontFamily: "var(--font-body)" }}
            >
              {t("notFound.backHome")}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
