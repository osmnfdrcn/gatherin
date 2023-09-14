"use client";

import Image from "next/image";
import Button from "@/components/ui/button";
import Link from "next-intl/link";
import { setShowMobileMenu } from "@/store/slices/appSlice";
import { useMenu } from "./useMenu";

const Menu = () => {
  const { t, dispatch, menuIcons } = useMenu();
  return (
    <>
      {menuIcons.map((i) => (
        <Link
          href={i.link}
          key={i.id}
          onClick={() => dispatch(setShowMobileMenu(false))}
        >
          <div className="flex items-center justify-start gap-4 h-[60px] py-[10px] border-b-[1px] border-steel-blue cursor-pointer">
            <Button variant="primary" className="rounded-md">
              <Image src={i.icon} width={40} height={40} alt="notification" />
            </Button>
            <div className="h-[24px] flex items-center justify-center">
              <p className="font-bold text-black  hover:text-steel-blue">
                {i.title}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Menu;
