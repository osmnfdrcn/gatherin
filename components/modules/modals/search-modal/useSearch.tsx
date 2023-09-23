import { setShowSearchBar } from "@/store/slices/appSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { IPlace } from "@/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
type Props = {};

const useSearch = () => {
  const [searchString, setSearchString] = useState("");
  const [data, setData] = useState<IPlace[] | null>([]);
  const t = useTranslations("Search");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { showSearchBar } = useAppSelector((store: RootState) => store.app);

  const handleSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const url = `/api/place/?search=${searchString.toLowerCase()}`;
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      setSearchString("");
      try {
        const response = await fetch(url, {
          method: "GET",
          headers,
        });
        if (response.ok) {
          const responseData = await response.json();
          setData(responseData);
        } else {
          console.error("Something went wrong:", response.statusText);
        }
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    }
  };

  const handleClose = () => {
    setSearchString("");
    setData([]);
    dispatch(setShowSearchBar(false));
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  return {
    showSearchBar,
    searchString,
    setSearchString,
    handleSubmit,
    data,
    setData,
    handleClose,
    t,
  };
};

export default useSearch;
