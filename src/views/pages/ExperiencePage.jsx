import PageShell from "../../components/PageShell.jsx";
import Experiencia from "../Experiencia.jsx";

export default function ExperiencePage({ slug, ...props }) {
  return (
    <PageShell {...props}>
      <Experiencia slug={slug} />
    </PageShell>
  );
}
