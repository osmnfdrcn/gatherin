"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IPlace } from "@/types";
import VideoConference from "@/components/modules/video-conference";
import Button from "@/components/ui/button";
import { useSession } from "next-auth/react";
type Props = {
  id: string;
  place: IPlace;
};

const Place = ({ id, place }: Props) => {
  const [joined, setJoined] = useState(false);
  const { data: session } = useSession();
  if (joined) {
    return <VideoConference roomID={id} name={session?.user?.name as string} />;
  }
  return (
    <div className="w-full bg-slate-50 p-10">
      <div className="flex flex-col lg:grid grid-cols-3 gap-4">
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
          <p className="text-lg ">Sahibi {place?.owner.name}</p>
          <p className=" text-sm"> {place?.description}</p>
          {session ? (
            <Button
              variant={"primary"}
              className="w-1/2 bg-slate-800 text-white py-2 px-4 rounded-lg "
              onClick={() => setJoined(true)}
            >
              Join
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Place;
