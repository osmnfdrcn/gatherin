import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

const Bookings = ({ params: { slug } }: Props) => {
  return <div>{slug}</div>;
};

export default Bookings;
