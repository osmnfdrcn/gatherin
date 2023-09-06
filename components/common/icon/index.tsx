import { IconType } from "react-icons";

type Props = {
  Icon: IconType;
  rounded?: boolean;
  bgColor?: string;
  color?: string;
  size?: number;
};

// refactor this with cva
const IconComponent = ({ Icon, rounded, bgColor, color, size }: Props) => {
  let style = "h-[38px] w-[38px] flex items-center justify-center";
  bgColor ? (style += "bg-rose-700") : null;
  color ? (style += color) : null;

  rounded ? (style += "rounded=full") : null;

  return (
    <div className={style}>
      <Icon
        size={size}
        className="w-full font-bold text-black cursor-pointer"
      />
    </div>
  );
};

export default IconComponent;
