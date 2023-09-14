import Warning from "@/components/common/warning";
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
      {place ? (
        <Place id={id} place={place as any} />
      ) : (
        <Warning text={"404"} />
      )}
    </PageWrapper>
  );
};

export default PlacePage;
