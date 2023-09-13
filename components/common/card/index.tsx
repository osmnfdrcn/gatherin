"use client";
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";
import { IUser } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Gathering } from "@prisma/client";
import isAfter from "date-fns/isAfter";
type Props = {
  image: string;
  owner: string;
  ownerId: string;
  name: string;
  placeId: string;
};

const Card = ({ image, owner, ownerId, name, placeId }: Props) => {
  const t = useTranslations("Home");

  return (
    <div className="relative  h-auto shadow-md rounded-lg transition delay-100 bg-slate-50 brightness-100 hover:brightness-95">
      <div className="relative bg-no-repeat bg-center h-[250px] md:h-[310px] shadow-md cursor-pointer rounded-lg  transition delay-100">
        <Link href={`/place/${placeId}`}>
          <Image
            src={image}
            alt={name}
            fill
            style={{ objectFit: "cover" }}
            className=" rounded-xl  "
          />
        </Link>
      </div>
      <div className="flex flex-col justify-between gap-4 py-4 px-2 h-[100px]">
        <p className="text-lg font-semibold ">{name}</p>
        <Link href={`/users/${ownerId}`}>
          <span className="text-steel-blue text-sm mb-2 cursor-pointer ">
            {t("owner")} {owner}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Card;

[
  { start: "2023-10-16T15:00:00.000Z", name: "dsadas" },
  { start: "2023-10-12T15:00:00.000Z", name: "dsadas" },
  { start: "2023-10-111T15:00:00.000Z", name: "dsadas" },
  { start: "2023-10-14T15:00:00.000Z", name: "dsadas" },
  { start: "2023-10-13T15:00:00.000Z", name: "dsadas" },
];
