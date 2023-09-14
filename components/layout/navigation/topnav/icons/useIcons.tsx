import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useAppDispatch } from "@/store/store";

export const useIcons = (showMenuBar: boolean) => {
  const t = useTranslations("Topbar");
  const { data: session, status } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const ref = useRef(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleProfileClick = () => {
    setShowUserMenu(false);
    router.push(`/users/${session?.user.id}`);
  };

  const handleClickOutside = () => {
    setShowUserMenu(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  return {
    t,
    session,
    setShowUserMenu,
    showUserMenu,
    handleProfileClick,
    dispatch,
    signOut,
    status,
  };
};

export default useIcons;
