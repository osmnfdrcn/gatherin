import React from "react";

type Props = {
  text: string;
};

const Title = ({ text }: Props) => {
  return (
    <div className="text-2xl text-slate-800 font-semibold leading-10 mb-4	">
      {text}
    </div>
  );
};

export default Title;
