import HydrationErrorFix from "@/components/common/hydration";
import AuthCheck from "@/components/common/protected";
import OpenYourOwnPlace from "@/components/modules/open-your-own-place";
import getCurrentUser from "@/helpers/getCurrentUser";
import React from "react";

type Props = {};

const OpenPage = async (props: Props) => {
  const user = await getCurrentUser();
  return <OpenYourOwnPlace userId={user?.id as string} />;
};

export default OpenPage;
