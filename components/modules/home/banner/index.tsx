import PageHeader from "@/components/layout/page-header";
import BackgroundImage from "./background";

const Banner = () => {
  return (
    <div className="hidden relative md:block col-span-4 bg-cover bg-no-repeat bg-center h-[400px]">
      <BackgroundImage />
      <PageHeader />
    </div>
  );
};

export default Banner;
