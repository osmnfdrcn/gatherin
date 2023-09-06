import logo from "@/public/svgs/logo-taster.svg";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="w-[177px] h-[30px] md:w-[220px] md:h-[47px] relative cursor-pointer py-2">
      <Link href="/">
        <Image src={logo} fill alt="Logo" priority />
      </Link>
    </div>
  );
};

export default Logo;
