import { IPlace } from "@/types";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export const useDashboard = () => {
  const t = useTranslations("Dashboard");
  const [places, setPlaces] = useState<IPlace[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setIsLoading(true);
<<<<<<< HEAD
    fetch(
      `/api/place/?ownerId=${session?.user.id}`,
      {
        cache: "no-cache",
      }
    )
=======
    fetch(`/api/place/?ownerId=${session?.user.id}`, {
      cache: "no-cache",
    })
>>>>>>> 48b618d1e7ca7c8d8d02eb4e9720c6761e721a20
      .then((res) => res.json())
      .then((res) => setPlaces(res))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  return { t, status, isLoading, places };
};
