import Card from "@/components/common/card";
import Banner from "@/components/modules/banner";
import { Input } from "@/components/ui/input";
import { getPlaces } from "@/helpers/getPlaces";
export const dynamic = "force-static";

const App = async () => {
  const places = await getPlaces();

  return (
    <section className=" w-full">
      <Banner />
      <div className="px-4 my-2 md:my-4 flex justify-end">
        <Input
          placeholder="Search Places"
          className="w-full md:w-[260px] border-none bg-slate-100 rounded-full py-[20px] text-lg font-semibold text-slate-700"
          // onClick={handleClick}
        />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 px-4 ">
        {places?.map((p) => {
          return (
            <Card
              key={p.id}
              image={p?.image}
              owner={p?.owner?.name}
              ownerId={p?.owner?.id}
              name={p?.name}
              placeId={p?.id}
            />
          );
        })}
      </div>
    </section>
  );
};

export default App;
