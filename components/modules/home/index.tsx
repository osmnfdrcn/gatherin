"use client";
import Card from "@/components/common/card";
import SearchInput from "@/components/layout/page-header/search-input";
import Banner from "@/components/modules/home/banner";
import { IPlace } from "@/types";
import { useEffect, useMemo, useState } from "react";

const Home = () => {
  const [places, setPlaces] = useState<IPlace[] | null>(null);
  const placeMemo = useMemo(() => places, []);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/place/`, {
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((res) => {
        setPlaces(res);
      });
  }, [placeMemo]);

  useEffect(() => console.log("rendered"));
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
