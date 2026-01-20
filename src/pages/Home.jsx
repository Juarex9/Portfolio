import Hero from "../components/Hero";
import IntroPresentation from "../components/IntroPresentacion";
import TechMarquee from "../components/TechMarquee";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee speedSeconds={22} title="Stack" />
      <IntroPresentation />
    </>
  );
}
