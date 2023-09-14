import PageWrapper from "@/components/layout/page-wrapper";
import DashboardNav from "@/components/modules/dashboard/dashboard-nav/index.tsx";
import React from "react";

type Props = { children: React.ReactNode; params: { id: string } };

const layout = ({ children, params }: Props) => {
  return (
    <PageWrapper>
      <div className="flex flex-col gap-2">
        <DashboardNav placeId={params.id} />
        {children}
      </div>
    </PageWrapper>
  );
};

export default layout;
