"use client";
import turkish from "@/public/svgs/turkish-flag.svg";
import english from "@/public/svgs/uk-flag.svg";

import Link from "next-intl/link";
import Image from "next/image";
import React from "react";
import { useLanguageSwitcher } from "./useLanguageSwitcher";

const LanguageSwitcher = () => {
  const { locale, otherLocale, pathname } = useLanguageSwitcher();
  return (
    <div className=" lg:flex items-center justify-center gap-8 ">
      <div className=" w-[50px] h-[20px] flex items-center justify-center gap-4 cursor-pointer ">
        <Link href={pathname} locale={otherLocale}>
          <Image
            src={locale === "tr" ? english : turkish}
            alt="language switcher icon"
            width={30}
            height={30}
          />
        </Link>
      </div>
    </div>
  );
};
export default React.memo(LanguageSwitcher);
