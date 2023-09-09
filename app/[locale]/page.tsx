import Home from "@/components/modules/home";
import { getPlaces } from "@/helpers/getPlaces";
import { IPlace } from "@/types";

const App = async () => {
  const places = await getPlaces();

  return <Home places={places as IPlace[] | null} />;
};

export default App;
