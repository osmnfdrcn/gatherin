import Logo from "@/components/common/logo";
import Icons from "./icons";
import { IUser } from "@/types";
import getCurrentUser from "@/helpers/getCurrentUser";

const TopNav = async () => {
  const user = await getCurrentUser();

  return (
    <nav className="w-full h-[100px]  bg-slate-50  py-[30px] px-[20px]">
      <div className="flex items-center md:items-start justify-between">
        <Logo />
        <Icons userID={user?.id as string} />
      </div>
    </nav>
  );
};

export default TopNav;
