"use client";
import AuthRequired from "@/components/common/protected";
import Title from "@/components/common/title";
import Spinner from "@/components/layout/spinner";
import Button from "@/components/ui/button";
import { IPlace } from "@/types";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const t = useTranslations("Dashboard");
  const [places, setPlaces] = useState<IPlace[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/place/?ownerId=${session?.user.id}`,
      {
        cache: "no-cache",
      }
    )
      .then((res) => res.json())
      .then((res) => setPlaces(res))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  if (status !== "authenticated") {
    return <AuthRequired />;
  }
  if (isLoading) {
    return (
      <div className="w-full h-[400px]">
        <Spinner />
      </div>
    );
  }
  return (
    <div className=" md:px-8 py-6 flex flex-col gap-4">
      <Title text={t("dashboard")} />
      <div className="flex flex-col gap-4">
        {places?.map((p: IPlace) => (
          <PlaceCard name={p.name} key={p.id} id={p.id} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

const PlaceCard = ({ name, id }: { name: string; id: string }) => {
  return (
    <Link href={`/dashboard/${id}/edit-place`}>
      <div className=" h-[80px] md:h-[120px] bg-slate-100 hover:bg-yellow-300 transition delay-100 rounded-lg flex items-center justify-between px-[10px]  md:p-[40px] cursor-pointer ">
        <span className="text-slate-800  text-lg  md:text-2xl font-bold">
          {name}
        </span>
        <Button variant={"primary"} className="bg-slate-800 text-white w-6 h-6">
          +
        </Button>
      </div>
    </Link>
  );
};
