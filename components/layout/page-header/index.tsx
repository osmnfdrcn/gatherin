"use client";
import Icons from "@/components/layout/navigation/topnav/icons";
import SearchInput from "./search-input";

const PageHeader = () => {
  return (
    <div className=" hidden absolute top-0 left-0 right-0 md:flex justify-between items-center w-full px-[10px] h-[100px]">
      <SearchInput />
      <Icons showMenuBar={false} />
    </div>
  );
};

export default PageHeader;
