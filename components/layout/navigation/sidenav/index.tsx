"use client";
import Logo from "@/components/common/logo";
import Button from "@/components/ui/button";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import LanguageSwitcher from "../languageSwitcher";
import Menu from "../menu";
import { useSideNav } from "./useSideNav";

const SideNav = () => {
  const { showMobileMenu, size, handleOpenYourPlaceClick, t, socialIcons } =
    useSideNav();

  return (
    <div className={`${showMobileMenu ? "block" : "hidden"}  md:block`}>
      <nav className="w-full md:w-[320px] h-[calc(100vh-100px)] md:h-[100vh] bg-slate-50  pt-[40px] pb-2 px-[25px] absolute top-[100px] md:top-0 right-0 left-0 z-40 md:sticky flex flex-col justify-between ">
        <div>
          <section className="flex flex-col">
            {!showMobileMenu || size.width! >= 768 ? (
              <div className="mb-[40px] flex items-center justify-between">
                <Logo />
              </div>
            ) : null}
            <Menu />
            <Button className="bg-yellow-300 rounded-lg mt-5 py-3  ">
              <div
                className="flex items-center justify-start gap-2 w-full font-bold text-xl hover:text-steel-blue transition"
                onClick={handleOpenYourPlaceClick}
              >
                <AiOutlinePlus size={25} />
                <p className="font-semibold ">{t("open-your-own-place")}</p>
              </div>
            </Button>
          </section>
          <div className="w-full mt-5 hidden md:flex justify-center ">
            <LanguageSwitcher />
          </div>
        </div>
        <div className="flex gap-2">
          {socialIcons.map((i) => (
            <Button variant={"rounded"} key={i.id}>
              <Image src={i.icon} width={40} height={40} alt="notification" />
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SideNav;
