import { Gathering } from "@prisma/client";
import isBefore from "date-fns/isBefore";
import isAfter from "date-fns/isAfter";

import { useTranslations } from "next-intl";

const useCard = (gatherings: Gathering[]) => {
  const t = useTranslations("Home");
  const monthTranslations = useTranslations("Months");

  const closestEvent = gatherings.filter((g) => isBefore(new Date(), g.end))[0];
  const baslangicSaatiGeldiMi = isAfter(new Date(), closestEvent?.start);
  const bitisSaatiGectiMi = isAfter(new Date(), closestEvent?.end);
  const isActive = baslangicSaatiGeldiMi && !bitisSaatiGectiMi;

  return { closestEvent, t, monthTranslations, isActive };
};

export default useCard;
