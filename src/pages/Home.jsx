import Hero from "../components/Hero";
import IntroPresentation from "../components/IntroPresentacion";
import TechMarquee from "../components/TechMarquee";
import FeaturedProjects from "../components/FeaturedProjects";
import { Seo } from "../components/Seo";
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

      <span className="sr-only">{t("seo.home.indexableIntro")}</span>

      <Hero />
      <TechMarquee speedSeconds={22} title="Stack" />
      <FeaturedProjects />
      <IntroPresentation />
    </>
  );
}
