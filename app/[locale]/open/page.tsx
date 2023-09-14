import PageWrapper from "@/components/layout/page-wrapper";
import PlaceManager from "@/components/modules/dashboard/edit-place";
import OpenYourPlace from "@/components/modules/open-your-place";

const OpenPage = async () => {
  return (
    <PageWrapper>
      <OpenYourPlace />;
    </PageWrapper>
  );
};

export default OpenPage;
