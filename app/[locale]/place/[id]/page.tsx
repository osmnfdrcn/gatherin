import PageWrapper from "@/components/layout/page-wrapper";
import Place from "@/components/modules/place";
import { getPlaceById } from "@/helpers/getPlaceById";

type Props = {
  params: {
    id: string;
  };
};

const PlacePage = async ({ params: { id } }: Props) => {
  const place = await getPlaceById(id);
  return (
    <PageWrapper>
      <Place id={id} place={place as any} />
    </PageWrapper>
  );
};

export default PlacePage;
