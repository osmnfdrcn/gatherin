import getCurrentUser from "@/helpers/getCurrentUser";
import SearchInput from "@/components/common/searchInput";
import BackgroundImage from "./background";

type Props = {};

const Banner = (props: Props) => {
  return (
    <div className="hidden relative md:block col-span-4 bg-cover bg-no-repeat bg-center h-[400px]">
      {" "}
      <BackgroundImage />
      <SearchInput />
    </div>
  );
};

export default Banner;
