import { IPlace } from "@/types";
import { useEffect, useState } from "react";

export const useHomePage = () => {
  const [places, setPlaces] = useState<IPlace[] | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsloading(true);
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/place/`, {
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((res) => {
        setPlaces(res);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsloading(false));
  }, []);
  return { places, isLoading };
};

export default useHomePage;
