import Hero from "../components/Hero";
import IntroPresentation from "../components/IntroPresentacion";
import TechMarquee from "../components/TechMarquee";
import FeaturedProjects from "../components/FeaturedProjects";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee speedSeconds={22} title="Stack" />
      <FeaturedProjects />
      <IntroPresentation />
    </>
  );
}
