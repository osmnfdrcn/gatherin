import Home from "@/components/modules/home";
import { getPlaces } from "@/helpers/getPlaces";
import { IPlace } from "@/types";
// const getPlaces = async (): Promise<IPlace[]> => {
//   const data = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/place/`, {
//     cache: "no-cache",
//   });
//   const places = await data.json();

//   return places;
// };
const App = async () => {
  return <Home />;
};

export default App;
