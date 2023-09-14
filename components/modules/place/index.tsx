"use client";
import VideoConference from "@/components/modules/video-conference";
import Button from "@/components/ui/button";
import { IPlace } from "@/types";
import { Gathering } from "@prisma/client";
import isAfter from "date-fns/isAfter";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  id: string;
  place: IPlace;
};

const Place = ({ id, place }: Props) => {
  const t = useTranslations("Place");
  const monthTranslations = useTranslations("Months");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
          <Event key={g.id} event={g} />
        ))}
      </div>
    </div>
  );
};
export default Place;

const Event = ({ event }: { event: Gathering }) => {
  const t = useTranslations("Gathering");
  const { id, start, end, description } = event;
  const [joined, setJoined] = useState(false);
  const { data: session, status } = useSession();

  const monthTranslations = useTranslations("Months");
  const baslangicSaatiGeldiMi = isAfter(new Date(), start);
  const bitisSaatiGectiMi = isAfter(new Date(), end);
  const isJoinable = baslangicSaatiGeldiMi && !bitisSaatiGectiMi;

  if (joined) {
    return <VideoConference roomID={id} name={session?.user?.name as string} />;
  }

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between  gap-8 p-4 bg-white rounded-lg">
      <div className="flex flex-col gap-4 w-full lg:w-2/3">
        <p className="font-bold text-slate-700 text-xl">
          {start.toLocaleString("default", { day: "2-digit" })}{" "}
          {monthTranslations(
            start.toLocaleString("default", { month: "long" })
          )}{" "}
          {start.toLocaleString("default", { year: "numeric" })}
          {" | "}
          {start.toLocaleString("default", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
        <span className="text-justify">{description}</span>
      </div>
      {status === "authenticated" && isJoinable ? (
        <div className="w-full lg:w-[150px] flex justify-center">
          <Button
            className="w-full  px-4 py-2 rounded-lg bg-slate-700 text-white font-semibold"
            onClick={() => setJoined(true)}
          >
            {t("join")}
          </Button>{" "}
        </div>
      ) : null}
    </div>
  );
};

const isJoinable = (start: Date, end: Date) => {
  const baslangicSaatiGeldiMi = isAfter(new Date(), start);
  const bitisSaatiGectiMi = isAfter(new Date(), end);
  return baslangicSaatiGeldiMi && !bitisSaatiGectiMi;
};
