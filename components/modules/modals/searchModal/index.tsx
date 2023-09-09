"use client";

import { Input } from "@/components/ui/input";
import { setShowSearchBar } from "@/store/slices/appSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { IPlace } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [searchString, setSearchString] = useState("");
  const [data, setData] = useState<IPlace[] | null>([]);
  const t = useTranslations("Search");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { showSearchBar } = useAppSelector((store: RootState) => store.app);

  const handleSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const url = `${
        process.env.NEXT_PUBLIC_SITE_URL
      }/api/place/?search=${searchString.toLowerCase()}`;
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

  if (showSearchBar) {
    return (
      <div className="fixed z-50 inset-0 bg-gray-800 bg-opacity-80 overflow-y-auto h-full w-full  p-4">
        <div className="flex flex-col items-center w-full h-full justify-start">
          <Input
            className="w-full mt-[5rem] md:mt-[10rem] max-w-[600px] p-6 text-lg  rounded-full font-light text-slate-700"
            placeholder={t("search")}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchString(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              handleSubmit(e)
            }
            value={searchString}
            autoFocus
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 px-4 mt-6">
            {data?.map((p) => (
              <Card
                setData={setData}
                setSearchString={setSearchString}
                key={p.id}
                image={p?.image}
                owner={p?.owner?.name}
                ownerId={p?.owner?.id}
                name={p?.name}
                placeId={p?.id}
              />
            ))}
          </div>
        </div>
        <p
          className="absolute top-4 right-4 text-xl text-white font-bold cursor-pointer"
          onClick={handleClose}
        >
          {t("close")}
        </p>
      </div>
    );
  }
};
export default Search;

type CardProps = {
  image: string;
  owner: string;
  ownerId: string;
  name: string;
  placeId: string;
  setData: (v: IPlace[]) => void;
  setSearchString: (v: string) => void;
};

const Card = ({
  image,
  owner,
  ownerId,
  name,
  placeId,
  setSearchString,
  setData,
}: CardProps) => {
  const t = useTranslations("Home");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSearchResultClick = () => {
    setSearchString("");
    setData([]);
    dispatch(setShowSearchBar(false));
    router.push(`/place/${placeId}`);
  };
  return (
    <div
      className=" relative flex flex-col gap-2 h-[100px] bg-slate-200 rounded-xl cursor-pointer"
      onClick={handleSearchResultClick}
    >
      <div className=" relative flex items-center justify-start gap-4 h-full w-full">
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          style={{ objectFit: "cover" }}
          className=" rounded-xl  "
        />
        <div className="flex flex-col justify-between gap-2 py-4 px-2 ">
          <p className="text-lg font-semibold ">{name}</p>
          <Link href={`/users/${ownerId}`}>
            <span className="text-steel-blue text-sm  cursor-pointer ">
              {t("owner")} {owner}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
