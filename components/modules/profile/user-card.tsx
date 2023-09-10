"use client";
import Button from "@/components/ui/button";
import blankProfileImage from "@/public/images/blank_profile.jpeg";
import { IUser } from "@/types";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
type Props = {
  user: IUser;
  isEditing: boolean;
  setIsEditing: (v: boolean) => void;
};

const UserCard = ({ user, setIsEditing, isEditing }: Props) => {
  const t = useTranslations("User");

  const { data: session, status } = useSession();
  const ownProfile = user?.email === session?.user?.email;

  return (
    <div className="col-span-3 xl:col-span-1 ">
      <div className="relative w-full flex flex-col gap-4 p-[25px] bg-slate-50 rounded-xl shadow-md">
        <div className="flex justify-start items-center gap-4">
          <Image
            src={user?.image || blankProfileImage}
            width={96}
            height={96}
            alt="blank profile image"
            className="rounded-full"
          />
          <div className="flex flex-col ">
            <p className="text-slate-800 text-2xl font-semibold">
              {user?.name}
            </p>
          </div>
        </div>
        <div className="w-full border-t-[1px] border-b-[1px] border-steel-blue py-6">
          <p className=" text-slate-500 font-bold mb-[10px]">Bio</p>
          <p className="font-light text-slate-600">{user?.bio}</p>
        </div>
        {!ownProfile && session ? (
          <Button className="bg-steel-blue w-full py-2 rounded-lg hover:bg-steel-blue/90 text-white ">
            {t("add-friend")}
          </Button>
        ) : null}

        {ownProfile && status === "authenticated" ? (
          <p
            className="absolute top-2 right-2 font-semibold text-sm text-slate-600 cursor-pointer"
            onClick={() => setIsEditing(!isEditing)}
          >
            {t("edit")}
          </p>
        ) : null}
      </div>
      <div className="w-full flex flex-col gap-4 px-[25px] bg-slate-50 rounded-xl mt-4 shadow-lg">
        <div className="w-full  py-6">
          <p className=" text-slate-500 font-bold mb-[10px]">
            {" "}
            {t("my-places")}
          </p>
          <div className="">
            {user?.places.map((p) => {
              return (
                <div
                  className="text-sm font-semibold text-slate-600 flex gap-2"
                  key={p.id}
                >
                  <p className="text-steel-blue"> {t("owner-of")}</p>
                  <Link href={`/place/${p.id}`}>{p.name}</Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
