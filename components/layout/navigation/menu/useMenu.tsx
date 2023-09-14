import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useAppDispatch } from "@/store/store";
import bookingsIcon from "@/public/svgs/bookings.svg";
import dashboardIcon from "@/public/svgs/dashboard.svg";
import homepageIcon from "@/public/svgs/homepage.svg";

export const useMenu = () => {
  const t = useTranslations("SideNav");
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const menuIcons = session
    ? [
        {
          id: 0,
          icon: homepageIcon,
          title: t("home"),
          link: "/",
        },
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
    : [
        {
          id: 0,
          icon: homepageIcon,
          title: t("home"),
          link: "/",
        },
      ];

  return { t, dispatch, menuIcons };
};
