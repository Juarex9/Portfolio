import Hero from "../components/Hero";
import IntroPresentation from "../components/IntroPresentacion";
import TechMarquee from "../components/TechMarquee";
import { Seo } from "../components/Seo";
import { VisuallyHidden } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        titleKey="seo.home.title"
        descriptionKey="seo.home.description"
        canonicalPath="/"
      />

      {/* Texto indexable extra sin afectar diseño */}
      <VisuallyHidden as="p">
        {t("seo.home.indexableIntro")}
      </VisuallyHidden>

      <Hero />
      <TechMarquee speedSeconds={22} title="Stack" />
      <IntroPresentation />
    </>
  );
}