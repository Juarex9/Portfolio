import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAccentColors } from "../hooks/useAccentColors";
import { Seo } from "../components/Seo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const { accentColor } = useAccentColors();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Seo
        titleKey="seo.notFound.title"
        descriptionKey="seo.notFound.description"
        canonicalPath="/404"
      />
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
            <p className="leading-relaxed text-gray-500" style={{ fontFamily: "var(--font-body)" }}>
              {t("notFound.description")}
            </p>
            <Button
              onClick={() => navigate("/")}
              className="text-white hover:opacity-90"
              style={{ backgroundColor: accentColor, fontFamily: "var(--font-body)" }}
            >
              {t("notFound.backHome")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
