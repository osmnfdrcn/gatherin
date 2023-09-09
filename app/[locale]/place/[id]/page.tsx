import Place from "@/components/modules/place";
import { getPlaceById } from "@/helpers/getPlaceById";

type Props = {
  params: {
    id: string;
  };
};

const PlacePage = async ({ params: { id } }: Props) => {
  const place = await getPlaceById(id);
  return <Place id={id} place={place as any} />;
};

export default PlacePage;
