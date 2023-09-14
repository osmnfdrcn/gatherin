"use client";
import AuthRequired from "@/components/common/warning";
import Title from "@/components/common/title";
import Spinner from "@/components/layout/spinner";
import Button from "@/components/ui/button";
import { IPlace } from "@/types";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Warning from "@/components/common/warning";
import { useDashboard } from "./useDashboard";
import PlaceCard from "./place-card";

const Dashboard = () => {
  const { t, status, isLoading, places } = useDashboard();

  if (status !== "authenticated") {
    return <Warning text="auth-warning" />;
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
