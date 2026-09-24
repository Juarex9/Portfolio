import PageShell from "../../components/PageShell.jsx";
import Proyecto from "../Proyecto.jsx";

export default function ProjectPage({ slug, ...props }) {
  return (
    <PageShell {...props}>
      <Proyecto slug={slug} />
    </PageShell>
  );
}
