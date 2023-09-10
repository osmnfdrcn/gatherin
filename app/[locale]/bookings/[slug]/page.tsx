import PageWrapper from "@/components/layout/page-wrapper";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

const page = ({ params: { slug } }: Props) => {
  return (
    <PageWrapper>
      <div>{slug}</div>
    </PageWrapper>
  );
};

export default page;
