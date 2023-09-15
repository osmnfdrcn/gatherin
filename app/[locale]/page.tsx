import Home from "@/components/modules/home";
import { getPlaces } from "@/helpers/getPlaces";

const App = async () => {
  const places = await getPlaces();
  if (!places?.length) return null;
  return <Home places={places} />;
};

export default App;
