import Card from "@/components/common/card";
import Banner from "@/components/modules/banner";
import { getPlaces } from "@/helpers/getPlaces";

const App = async () => {
  const places = await getPlaces();
  return (
    <section className=" w-full">
      <Banner />
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 px-4 mt-4">
        {places?.map((p) => {
          return (
            <Card
              key={p.id}
              image={p.image}
              owner={p.owner.name}
              ownerId={p.owner.id}
              name={p.name}
              placeId={p.id}
            />
          );
        })}
      </div>
    </section>
  );
};

export default App;
