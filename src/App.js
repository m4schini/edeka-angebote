import { useLocation } from "react-router-dom";
import Edeka from "./components/edeka-angebote";

function App() {
  const search = useLocation().search;
  const market = new URLSearchParams(search).get("market");
  console.log(market);
  return (
    <main>
      <Edeka market={market} />
    </main>
  );
}

export default App;
