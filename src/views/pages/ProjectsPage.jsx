import PageShell from "../../components/PageShell.jsx";
import Proyectos from "../Proyectos.jsx";

export default function ProjectsPage(props) {
  return (
    <PageShell {...props}>
      <Proyectos />
    </PageShell>
  );
}
