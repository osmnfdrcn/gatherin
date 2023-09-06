import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import getCurrentUser from "@/helpers/getCurrentUser";
import Icons from "@/components/layout/navigation/topnav/icons";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const user = await getCurrentUser();

  // const [searchString, setSearchString] = useState("");
  //ref ile erisip enter'a basilinca search yonlenddirmesini yap /?search=searchString
  // const handleChange = (e: any) => {
  //   setSearchString(e.target.value);
  // };
  return (
    <div className="w-full px-4">
      <div className=" hidden md:flex justify-between items-center w-full px-[10px] h-[100px]">
        <Input
          placeholder="Search Places or People"
          className="w-[260px] border-none bg-slate-100 rounded-full p-[20px] text-lg font-semibold text-slate-700"
          // value={searchString}
          // onChange={handleChange}
        />
        <Icons showMenuBar={false} userID={user?.id as string} />
      </div>
      {children}
    </div>
  );
};

export default Layout;
