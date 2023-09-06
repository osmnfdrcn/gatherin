"use client";
import bannerTR from "@/public/images/banner_tr.png";
import bannerEN from "@/public/images/banner_en.png";
import Image from "next/image";
import { useLocale } from "next-intl";

type Props = {};

const BackgroundImage = (props: Props) => {
  const locale = useLocale();
  const banner = locale === "tr" ? bannerTR : bannerEN;
  return <Image src={banner} fill alt="banner" />;
};

export default BackgroundImage;
