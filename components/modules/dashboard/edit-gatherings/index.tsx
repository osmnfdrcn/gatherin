"use client";
import AuthRequired from "@/components/common/protected";
import Title from "@/components/common/title";
import Button from "@/components/ui/button";
import DatePicker from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import { IPlace } from "@/types";
import { addMinutes, format } from "date-fns";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
type Props = {
  placeId: string;
};

const EditGatherings = ({ placeId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const today = format(new Date(), "dd/MM/yyyy");
  const [date, setDate] = useState<string>(today);
  const [time, setTime] = useState<string>("00:00");
  const [duration, setDuration] = useState<any>(30);
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState<IPlace | null>(null);
  const t = useTranslations("Gathering");
  const { data: session, status } = useSession();
  let start = formatDate(date, time);
  let [hours, minutes] = time.split(":");
  const end = addMinutes(start, duration);
  const data = { start, end, userId: session?.user.id, placeId, description };

  if (status !== "authenticated") {
    return <AuthRequired />;
  }
  const handleClick = () => {
    setIsLoading(true);
    const requestOptions: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/gathering/`, requestOptions)
      .then((res) => {
        if (res?.ok) {
          toast.success(t("success"));
          setIsEditing(false);
          setDescription("");
        } else {
          toast.error(t("error"));
        }
      })
      .catch((error) => {
        toast.error(t("error"));
      })
      .finally(async () => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/place/?id=${placeId}`, {
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((res) => {
        setPlace(res[0]);
      });
  }, []);

  const isOwnerOfPlace = session.user.id === place?.ownerId;
  if (isOwnerOfPlace) {
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
                  onChange={(e) => setDuration(e.target.value)}
                  options={[
                    { id: "30", name: "0.5 hours" },
                    { id: "60", name: "1 hour" },
                    { id: "90", name: "1.5 hours" },
                    { id: "120", name: "2 hour" },
                    { id: "150", name: "2.5 hours" },
                    { id: "180", name: "3 hour" },
                    { id: "210", name: "3.5 hours" },
                    { id: "240", name: "4 hour" },
                  ]}
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

function formatDate(inputDate: string, inputTime: string) {
  const dateParts = inputDate.split("/");
  const timeParts = inputTime.split(":");

  if (dateParts.length !== 3) {
    throw new Error("Invalid input format");
  }
  let [day, month, year] = dateParts;
  month = month.replace(/^0+/, "");
  day = day.replace(/^0+/, "");

  let [hour, minute] = timeParts;
  hour = hour.replace(/^0+/, "") || "0";
  minute = minute.replace(/^0+/, "") || "0";

  const formattedDate = new Date(+year, +month - 1, +day, +hour, +minute, 0);

  return formattedDate;
}
