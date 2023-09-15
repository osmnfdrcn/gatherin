import EditPlace from "@/components/modules/dashboard/edit-place";

type Props = {
  params: { id: string };
};

const page = async ({ params: { id } }: Props) => {
  return <EditPlace placeId={id} />;
};

export default page;
