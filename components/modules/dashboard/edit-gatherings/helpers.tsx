export function formatDate(inputDate: string, inputTime: string) {
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

export const options = [
  { id: "30", name: "0.5 hours" },
  { id: "60", name: "1 hour" },
  { id: "90", name: "1.5 hours" },
  { id: "120", name: "2 hour" },
  { id: "150", name: "2.5 hours" },
  { id: "180", name: "3 hour" },
  { id: "210", name: "3.5 hours" },
  { id: "240", name: "4 hour" },
];
