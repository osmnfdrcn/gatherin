"use client";
import Logo from "@/components/common/logo";
import { useSession } from "next-auth/react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div>
        <div className="absolute z-50 inset-0 bg-gray-100  overflow-y-auto h-full w-full flex items-center justify-center px-2 ">
          <div className="relative flex flex-col items-center justify-center p-[10px]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="title-04a desc-04a"
              aria-live="polite"
              aria-busy="true"
              className="w-10 h-10 animate animate-spin"
              role="img"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                className="stroke-slate-200"
                strokeWidth="4"
              />
              <path
                d="M12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2"
                className="stroke-stone-500"
                strokeWidth="4"
              />
            </svg>
          </div>
          <div className="absolute top-[40px] left-6">
            <Logo />
          </div>
        </div>
        {children}
      </div>
    );
  }
  return <div>{children}</div>;
};

export default Wrapper;
