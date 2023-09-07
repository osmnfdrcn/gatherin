"use client";
import Icons from "@/components/layout/navigation/topnav/icons";
import { Input } from "@/components/ui/input";
import { setShowSearchBar } from "@/store/slices/appSlice";
import { useAppDispatch } from "@/store/store";

const SearchInput = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setShowSearchBar(true));
  };
  return (
    <div className=" hidden absolute top-0 left-0 right-0 md:flex justify-between items-center w-full px-[10px] h-[100px]">
      <Input
        placeholder="Search Places or People"
        className="w-[260px] border-none bg-slate-100 rounded-full py-[20px] text-lg font-semibold text-slate-700"
        onClick={handleClick}
      />
      <Icons showMenuBar={false} />
    </div>
  );
};

export default SearchInput;
