import EditPlace from "@/components/modules/dashboard/edit-place";

// const getPlace = async (id: string): Promise<IPlace> => {
//   const data = await fetch(
//     `${process.env.NEXT_PUBLIC_SITE_URL}/api/place/?id=${id}`,
//     {
//       cache: "no-cache",
//     }
//   );
//   const places = await data.json();

//   return places;
// };
type Props = {
  params: { id: string };
};

const page = async ({ params: { id } }: Props) => {
  // const place = await getPlace(id);
  return <EditPlace placeId={id} />;
};

export default page;
