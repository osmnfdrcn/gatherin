"use client";
import bookingsIcon from "@/public/svgs/bookings.svg";
import dashboardIcon from "@/public/svgs/dashboard.svg";
import homepageIcon from "@/public/svgs/homepage.svg";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "@/components/ui/button";
import Link from "next-intl/link";
import { useAppDispatch } from "@/store/store";
import { setShowMobileMenu } from "@/store/slices/appSlice";

const Menu = () => {
  const t = useTranslations("SideNav");
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const menuIcons = session
    ? [
        { id: 0, icon: homepageIcon, title: t("home"), link: "/" },
        {
          id: 1,
          icon: bookingsIcon,
          title: t("my-bookings"),
          link: "/bookings",
        },
        {
          id: 2,
          icon: dashboardIcon,
          title: t("dashboard"),
          link: "/dashboard",
        },
      ]
    : [{ id: 0, icon: homepageIcon, title: t("home"), link: "/" }];

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
