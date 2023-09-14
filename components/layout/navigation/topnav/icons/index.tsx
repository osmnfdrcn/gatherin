"use client";
import Button from "@/components/ui/button";
import { setShowLoginModal, setShowMobileMenu } from "@/store/slices/appSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { HiOutlineMenu } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import LanguageSwitcher from "../../languageSwitcher";
import { useIcons } from "./useIcons";

type Props = {
  showMenuBar?: boolean;
};

const Icons = ({ showMenuBar = true }: Props) => {
  const {
    t,
    session,
    setShowUserMenu,
    showUserMenu,
    handleProfileClick,
    dispatch,
    signOut,
    status,
  } = useIcons(showMenuBar);

  return (
    <div
      className={`h-[40px] ${
        session ? "w-[146px]" : "w-[126px]"
      } flex items-center justify-end gap-2 `}
    >
      <LanguageSwitcher />
      {status === "authenticated" ? (
        <div className="relative flex items-center justify-center">
          <Button
            variant="rounded"
            className="h-[35px] w-[35px] bg-steel-blue "
            onClick={() => {
              setShowUserMenu(!showUserMenu);
            }}
            // ref={ref} fix
          >
            <p className="text-md text-white">
              {" "}
              {session?.user?.name![0].toUpperCase()}{" "}
            </p>
          </Button>
          {showUserMenu ? (
            <div className="absolute top-10 rounded-lg right-0 z-[60] px-[15px] py-[5px] bg-white w-[200px] h-[80px] border border-slate-300 shadow-lg flex flex-col items-start justify-center text-slate-500 text-sm">
              <div
                className="w-full hover:bg-slate-100 cursor-pointer p-1 transition"
                onClick={handleProfileClick}
              >
                {t("profile")}
              </div>
              <div
                className="w-full hover:bg-slate-100 cursor-pointer p-1 transition "
                onClick={() => signOut()}
              >
                {t("logout")}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <Button
          variant="primary"
          className="block bg-fushia-400 hover:bg-fushia-500 transition py-[5px] px-[10px] rounded-full h-[40px] w-auto font-bold text-white text-lg"
        >
          <p className="" onClick={() => dispatch(setShowLoginModal(true))}>
            {t("login")}
          </p>
        </Button>
      )}

      {showMenuBar ? <MenuBar /> : null}
    </div>
  );
};

export default Icons;

const MenuBar = () => {
  const dispatch = useAppDispatch();
  const { showMobileMenu } = useAppSelector((store: RootState) => store.app);

  if (!showMobileMenu) {
    return (
      <Button
        variant="rounded"
        className="h-[40px] w-[40px]"
        onClick={() => dispatch(setShowMobileMenu(true))}
      >
        <HiOutlineMenu size={40} className="text-black " />
      </Button>
    );
  }

  return (
    <Button
      variant="rounded"
      className="h-[40px] w-[40px] "
      onClick={() => dispatch(setShowMobileMenu(false))}
    >
      <IoCloseSharp size={40} className="text-black " />
    </Button>
  );
};
