"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
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
