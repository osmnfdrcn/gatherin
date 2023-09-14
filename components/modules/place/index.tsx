"use client";
import { IPlace } from "@/types";
import { Gathering } from "@prisma/client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { EventCard } from "./event-card";

type Props = {
  id: string;
  place: IPlace;
};

const Place = ({ id, place }: Props) => {
  const t = useTranslations("Place");

  const gatherings = place?.gatherings.sort(
    (a, b) => Number(a.start) - Number(b.start)
  );

  return (
    <div className="w-full  bg-slate-100 p-3 md:p-10 mt-2 rounded-lg">
      <div className="flex flex-col lg:grid grid-cols-3 gap-4 mb-8">
        <div className="relative bg-no-repeat bg-center h-[250px] lg:h-[310px] shadow-md cursor-pointer rounded-lg  transition delay-100 col-span-1">
          <Image
            src={place?.image!}
            alt={place?.name!}
            fill
            style={{ objectFit: "cover" }}
            className=" rounded-xl  "
          />
        </div>
        <div className="col-span-2 flex flex-col gap-2 lg:gap-4 p-0 lg:p-4">
          <div className=" text-2xl lg:text-6xl font-semibold p-0 lg:py-4 -tracking-wide">
            {place?.name}
          </div>
          <Link href={`/users/${place?.ownerId}`}>
            <p className="text-lg ">
              {t("owner")} {place?.owner.name}
            </p>
          </Link>
          <p className="w-full text-justify text-sm"> {place?.description}</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 ">
        {gatherings?.map((g: Gathering) => (
          <EventCard key={g.id} event={g} />
        ))}
      </div>
    </div>
  );
};
export default Place;
