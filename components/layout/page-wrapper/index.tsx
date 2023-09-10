import React from "react";
import Icons from "../navigation/topnav/icons";
import SearchInput from "../page-header/search-input";

type Props = {
  children: React.ReactNode;
};
const PageWrapper = ({ children }: Props) => {
  return (
    <>
      <div className="w-full py-4">
        <div className=" hidden md:flex justify-between items-center w-full px-[10px] h-[100px]">
          <SearchInput />
          <Icons showMenuBar={false} />
        </div>
        <div className="w-full px-4 md:hidden md:my-4 flex justify-end">
          <SearchInput />
        </div>
        <div className="px-4">{children}</div>
      </div>
    </>
  );
};

export default PageWrapper;
