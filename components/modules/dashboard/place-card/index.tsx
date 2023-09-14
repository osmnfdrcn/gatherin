"use client";
import Button from "@/components/ui/button";
import Link from "next/link";

const PlaceCard = ({ name, id }: { name: string; id: string }) => {
  return (
    <Link href={`/dashboard/${id}/edit-place`}>
      <div className=" h-[80px] md:h-[120px] bg-slate-100 hover:bg-yellow-300 transition delay-100 rounded-lg flex items-center justify-between px-[10px]  md:p-[40px] cursor-pointer ">
        <span className="text-slate-800  text-lg  md:text-2xl font-bold">
          {name}
        </span>
        <Button variant={"primary"} className="bg-slate-800 text-white w-6 h-6">
          +
        </Button>
      </div>
    </Link>
  );
};

export default PlaceCard;
