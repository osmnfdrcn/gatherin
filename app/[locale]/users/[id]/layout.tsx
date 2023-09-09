import Icons from "@/components/layout/navigation/topnav/icons";
import SearchInput from "@/components/layout/page-header/search-input";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="w-full py-4">
      <div className=" hidden md:flex justify-between items-center w-full px-[10px] h-[100px]">
        <SearchInput />
        <Icons showMenuBar={false} />
      </div>
      {children}
    </div>
  );
};

export default Layout;
