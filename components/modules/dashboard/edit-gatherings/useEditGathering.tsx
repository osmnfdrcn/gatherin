import { useEffect, useReducer } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { addMinutes } from "date-fns";
import { formatDate } from "./helpers";
import { initialState, reducer } from "./reducer";

export const useEditGathering = (placeId: string) => {
  const { data: session, status } = useSession();
  const t = useTranslations("Gathering");
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    isEditing,
    isLoading,
    date,
    time,
    error,
    description,
    duration,
    place,
  } = state;

  const start = formatDate(date, time);
  const end = addMinutes(start, duration);

  const data = {
    start,
    end,
    userId: session?.user.id,
    placeId,
    description,
  };

  const handleClick = () => {
    dispatch({ type: "SET_ISLOADING", payload: true });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/gathering/`, requestOptions)
      .then((res) => {
        if (res?.ok) {
          toast.success(t("success"));
          dispatch({ type: "SET_ISEDITING", payload: false });
          dispatch({ type: "SET_DESCRIPTION", payload: "" });
        } else {
          toast.error(t("error"));
        }
      })
      .catch(() => {
        toast.error(t("error"));
      })
      .finally(() => {
        dispatch({ type: "SET_ISLOADING", payload: false });
      });
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/place/?id=${placeId}`, {
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: "SET_PLACE", payload: res[0] });
      })
      .catch(() => {
        dispatch({ type: "SET_ERROR", payload: true });
      });
  }, []);

  const isOwnerOfPlace = session?.user.id === place?.ownerId;

  const setDate = (v: string) => dispatch({ type: "SET_DATE", payload: v });
  const setTime = (v: string) => dispatch({ type: "SET_TIME", payload: v });
  const setDuration = (v: number) =>
    dispatch({ type: "SET_DURATION", payload: v });
  const setDescription = (v: string) =>
    dispatch({ type: "SET_DESCRIPTION", payload: v });
  const setIsEditing = (v: boolean) =>
    dispatch({ type: "SET_ISEDITING", payload: v });

  return {
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
  };
};

export default useEditGathering;
