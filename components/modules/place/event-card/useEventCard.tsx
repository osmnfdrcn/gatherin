import { Gathering } from "@prisma/client";
import isAfter from "date-fns/isAfter";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
const useEventCard = (event: Gathering) => {
  const t = useTranslations("Gathering");
  const { id, start, end, description } = event;
  const [joined, setJoined] = useState(false);
  const { data: session, status } = useSession();

  const monthTranslations = useTranslations("Months");
  const baslangicSaatiGeldiMi = isAfter(new Date(), start);
  const bitisSaatiGectiMi = isAfter(new Date(), end);
  const isJoinable = baslangicSaatiGeldiMi && !bitisSaatiGectiMi;

  return {
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
  };
};

export default useEventCard;
