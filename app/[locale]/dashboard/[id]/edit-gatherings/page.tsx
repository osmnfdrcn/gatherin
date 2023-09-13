import EditGatherings from "@/components/modules/dashboard/edit-gatherings";
import React from "react";

type Props = {
  params: { id: string };
};
const page = ({ params: { id } }: Props) => {
  return <EditGatherings placeId={id} />;
};

export default page;
