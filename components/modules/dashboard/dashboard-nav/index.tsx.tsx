"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardNav = ({ placeId }: { placeId: string }) => {
  const segment = usePathname().split("/").pop() || "";
  const t = useTranslations("Dashboard");

  const menu = [
    { id: 0, text: t("edit-place"), link: "edit-place" },
    { id: 1, text: t("edit-gatherings"), link: "edit-gatherings" },
    { id: 2, text: t("bookings"), link: "bookings" },
  ];

  return (
    <div className="w-full bg-slate-100 h-full flex items-center justify-start gap-4 p-4 mt-2  rounded-lg font">
      {menu.map((m) => (
        <Link key={m.id} href={`/dashboard/${placeId}/${m.link}`}>
          <p
            className={`p-2 rounded-lg text-xs md:text-sm font-semibold cursor-pointer leading-2 ${
              segment === m.link
                ? "text-steel-blue underline underline-offset-2 decoration-2"
                : "text-slate-700"
            }`}
          >
            {m.text}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default DashboardNav;
