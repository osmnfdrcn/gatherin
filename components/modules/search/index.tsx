"use client";

import { Input } from "@/components/ui/input";
import { setShowSearchBar } from "@/store/slices/appSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

const Search = () => {
  const [searchString, setSearchString] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { showSearchBar } = useAppSelector((store: RootState) => store.app);
  const ref = useRef(null);

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const url = searchString ? `/?place=${searchString.toLowerCase()}` : "";
      setSearchString("");
      dispatch(setShowSearchBar(false));
      router.push(url);
    }
  };

  const handleClickOutside = () => {
    dispatch(setShowSearchBar(false));
  };
  useOnClickOutside(ref, handleClickOutside);

  if (showSearchBar) {
    return (
      <div className="fixed z-50 inset-0 bg-gray-800 bg-opacity-60 overflow-y-auto h-full w-full flex items-start justify-center p-4">
        <Input
          className="w-full mt-[10rem] max-w-[600px] py-6 rounded-full"
          placeholder="Search"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchString(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleSubmit(e)
          }
          value={searchString}
          autoFocus
          ref={ref}
        />
      </div>
    );
  }
};
export default Search;
