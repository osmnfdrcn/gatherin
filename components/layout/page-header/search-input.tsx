"use client";

import { Input } from "@/components/ui/input";
import { setShowSearchBar } from "@/store/slices/appSlice";
import { useAppDispatch } from "@/store/store";
import { useTranslations } from "next-intl";

const SearchInput = () => {
  const t = useTranslations("Search");
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setShowSearchBar(true));
  };
  return (
    <Input
      placeholder={t("search")}
      className="w-full md:w-[260px] border-none bg-slate-100 rounded-full py-[20px] text-lg font-semibold text-slate-700 cursor-pointer "
      onClick={handleClick}
    />
  );
};

export default SearchInput;
