import Card from "@/components/common/card";
import SearchInput from "@/components/layout/page-header/search-input";
import Banner from "@/components/modules/home/banner";
import { IPlace } from "@/types";

type Props = {
  places: IPlace[];
};
const Home = ({ places }: Props) => {
  return (
    <section className=" w-full">
      <Banner />
      <div className="w-full px-4 my-2 md:my-4 flex justify-end">
        <SearchInput />
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

export default Home;
