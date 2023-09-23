"use client";
import { Gathering } from "@prisma/client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import isBefore from "date-fns/isBefore";
import useCard from "./useCard";

type Props = {
  image: string;
  owner: string;
  ownerId: string;
  name: string;
  placeId: string;
  gatherings: Gathering[];
};

const PlaceCard = ({
  image,
  owner,
  ownerId,
  name,
  placeId,
  gatherings,
}: Props) => {
  const { closestEvent, t, monthTranslations, isActive } = useCard(gatherings);
  return (
    <div className="relative  h-auto shadow-md rounded-lg transition delay-100 bg-slate-50 brightness-100 hover:brightness-95">
      <Link href={`/place/${placeId}`} className="relative">
        <div className="relative bg-no-repeat bg-center h-[250px] md:h-[310px] shadow-md cursor-pointer rounded-lg  transition delay-100">
          <Image
            src={image}
            alt={name}
            fill
            style={{ objectFit: "cover" }}
            className=" rounded-xl  "
          />
        </div>
      </Link>

      <div className="flex flex-col justify-between gap-2 py-4 px-2 ">
        <p className="text-lg font-semibold ">{name}</p>
        <Link href={`/users/${ownerId}`}>
          <span className="text-steel-blue text-sm mb-2 cursor-pointer ">
            {t("owner")} {owner}
          </span>
        </Link>
        {closestEvent ? (
          <div className="font-semibold text-slate-700 text-xs ">
            <p>{t("closest-event")}</p>
            <div className=" flex gap-1">
              <span>
                {closestEvent.start.toLocaleString("default", {
                  day: "numeric",
                })}
              </span>
              <span>
                {monthTranslations(
                  closestEvent.start.toLocaleString("default", {
                    month: "long",
                  })
                )}
              </span>
              <span>
                {closestEvent.start.toLocaleString("default", {
                  year: "numeric",
                })}
              </span>
              <span>|</span>
              <span>
                {closestEvent.start.toLocaleString("default", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ) : (
          <p className="font-semibold text-red-700 text-xs ">{t("no-event")}</p>
        )}
      </div>
      {isActive ? (
        <p className="absolute top-2 right-2 bg-green-600 text-white text-sm font-semibold p-2 rounded-lg">
          {t("active")}
        </p>
      ) : null}
    </div>
  );
};

export default PlaceCard;
