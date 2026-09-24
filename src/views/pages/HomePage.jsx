import PageShell from "../../components/PageShell.jsx";
import Home from "../Home.jsx";

export default function HomePage(props) {
  return (
    <PageShell {...props}>
      <Home />
    </PageShell>
  );
}
