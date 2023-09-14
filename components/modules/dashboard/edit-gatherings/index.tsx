"use client";
import Title from "@/components/common/title";
import Button from "@/components/ui/button";
import DatePicker from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import Warning from "@/components/common/warning";
import { options } from "./helpers";
import { useEditGathering } from "./useEditGathering";

type Props = {
  placeId: string;
};

const EditGatherings = ({ placeId }: Props) => {
  const {
    t,
    status,
    error,
    date,
    setDate,
    isEditing,
    time,
    setTime,
    setDuration,
    description,
    setDescription,
    isLoading,
    handleClick,
    setIsEditing,
    isOwnerOfPlace,
  } = useEditGathering(placeId);

  if (error) {
    return <Warning text="404" />;
  }

  if (status !== "authenticated") {
    return <Warning text="auth-warning" />;
  }

  if (isOwnerOfPlace && !error) {
    return (
      <div className="w-full p-4 bg-slate-100 h-auto ">
        {isEditing ? (
          <div className="flex flex-col items-center justify-start gap-4 ">
            <div className="w-full grid grid-cols-4  items-start justify-start gap-4 ">
              <div className=" w-full col-span-4 lg:col-span-2 ">
                <DatePicker
                  onChange={(value: string) => setDate(value)}
                  value={date}
                />
              </div>
              <div className=" w-full col-span-4 md:col-span-2 lg:col-span-1">
                <Input
                  type="time"
                  value={time}
                  className="w-full font-bold text-xl h-[60px] border-none rounded-lg"
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className=" w-full col-span-4 md:col-span-2 lg:col-span-1">
                <Select
                  label={""}
                  onChange={(e) => setDuration(+e.target.value)}
                  options={options}
                  isError={"true"}
                  errorMessage={""}
                  name={"name"}
                />
              </div>
            </div>

            <textarea
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="bg-white w-full p-[10px] md:h-[120px]  border-none bg-transparent placeholder:text-sm rounded-lg text-sm resize-y border-slate-400 test-sm "
              placeholder={t("description")}
            ></textarea>
            <div className="w-full flex justify-end">
              {" "}
              <Button
                variant="primary"
                className="w-full md:w-[200px] bg-slate-800 text-white px-6 py-4 rounded-lg "
                onClick={handleClick}
                loading={isLoading}
              >
                {t("save")}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Title text={t("add-opening")} />
            <div className="bg-white flex items-center justify-center p-[50px]">
              <p
                className="text-2xl underline text-steel-blue cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                {t("add-new-date")}
              </p>
            </div>
          </>
        )}
      </div>
    );
  }
};

export default EditGatherings;
