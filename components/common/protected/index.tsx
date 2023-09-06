"use client";

import { setShowLoginModal } from "@/store/slices/appSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

type Props = {
  children: React.ReactNode;
};

const AuthCheck = ({ children }: Props) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  !session ? dispatch(setShowLoginModal(true)) : null;
  return children;
};

export default AuthCheck;
