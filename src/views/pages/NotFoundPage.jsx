import PageShell from "../../components/PageShell.jsx";
import NotFound from "../NotFound.jsx";

export default function NotFoundPage(props) {
  return (
    <PageShell {...props}>
      <NotFound />
    </PageShell>
  );
}
