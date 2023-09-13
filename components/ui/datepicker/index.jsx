import { useEffect, useRef, useState } from "react";
import { Calendar } from "react-date-range";
import format from "date-fns/format";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DatePicker = ({ onChange, value }) => {
  const [open, setOpen] = useState(false);

  const refOne = useRef(null);

  useEffect(() => {
    onChange(format(new Date(), "dd/MM/yyyy"));
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleSelect = (date) => {
    onChange(format(date, "dd/MM/yyyy"));
    setOpen(false);
  };

  return (
    <div className="w-full relative flex justify-center items-center ">
      <input
        value={value}
        readOnly
        className=" w-full px-4 py-4 h-[60px]  text-xl font-bold text-black bg-white border-none rounded-lg  focus:outline-none cursor-pointer"
        onClick={() => setOpen((open) => !open)}
      />

      <div
        ref={refOne}
        className="absolute border shadow-md bg-white -translate-y-2/5 lg:top-[60px] left-1/2 transform -translate-x-1/2"
      >
        {open && (
          <Calendar
            date={new Date()}
            onChange={handleSelect}
            className="calendarElement cursor-pointer "
            onClick={() => setOpen(false)}
            minDate={new Date()}
          />
        )}
      </div>
    </div>
  );
};

export default DatePicker;
