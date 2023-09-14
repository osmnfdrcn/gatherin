"use client";
import VideoConference from "@/components/modules/video-conference";
import Button from "@/components/ui/button";
import { Gathering } from "@prisma/client";
import useEventCard from "./useEventCard";

export const EventCard = ({ event }: { event: Gathering }) => {
  const {
    joined,
    id,
    session,
    start,
    monthTranslations,
    description,
    isJoinable,
    setJoined,
    status,
    t,
  } = useEventCard(event);

  if (joined) {
    return <VideoConference roomID={id} name={session?.user?.name as string} />;
  }

  // const formatDate = (date:Date) => {
  //   const options = {
  //     day: "2-digit",
  //     month: "long",
  //     year: "numeric",
  //     hour: "numeric",
  //     minute: "2-digit",
  //   } as Intl.DateTimeFormatOptions; // Use type assertion here

  //   return date.toLocaleString("default", options);
  // };

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between  gap-8 p-4 bg-white rounded-lg">
      <div className="flex flex-col gap-4 w-full lg:w-2/3">
        <div className="font-bold text-slate-700 text-xl flex gap-2">
          <span>{start.toLocaleString("default", { day: "numeric" })}</span>
          <span>
            {monthTranslations(
              start.toLocaleString("default", { month: "long" })
            )}
          </span>
          <span>{start.toLocaleString("default", { year: "numeric" })}</span>
          <span>|</span>
          <span>
            {start.toLocaleString("default", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
        </div>
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
