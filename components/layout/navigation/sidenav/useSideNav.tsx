"use client";
import { setShowLoginModal } from "@/store/slices/appSlice";
import { useAppSelector, RootState, useAppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useWindowSize } from "usehooks-ts";
import linkedInIcon from "@/public/svgs/linkedin-blue.svg";
import facebookIcon from "@/public/svgs/facebook-blue.svg";
import instagramIcon from "@/public/svgs/instagram-blue.svg";

export const useSideNav = () => {
  const { data: session } = useSession();
  const t = useTranslations("SideNav");
  const router = useRouter();
  const size = useWindowSize();
  const { showMobileMenu } = useAppSelector((store: RootState) => store.app);
  const dispatch = useAppDispatch();

  const socialIcons = [
    { id: 0, icon: linkedInIcon },
    { id: 1, icon: facebookIcon },
    { id: 2, icon: instagramIcon },
  ];

  const handleOpenYourPlaceClick = () => {
    if (session) {
      router.push("/open");
    } else {
      dispatch(setShowLoginModal(true));
    }
  };

  return {
    showMobileMenu,
    size,
    handleOpenYourPlaceClick,
    t,
    socialIcons,
  };
};

export default useSideNav;
