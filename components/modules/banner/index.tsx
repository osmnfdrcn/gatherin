import getCurrentUser from "@/helpers/getCurrentUser";
import Search from "@/components/common/search";
import BackgroundImage from "./background";

type Props = {};

const Banner = async (props: Props) => {
  const user = await getCurrentUser();

  return (
    <div className="hidden relative md:block col-span-4 bg-cover bg-no-repeat bg-center h-[400px]">
      {" "}
      <BackgroundImage />
      <Search userId={user?.id as string} />
    </div>
  );
};

export default Banner;
