import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import { initialState, reducer } from "./reducer";

const initialFormikValues = {
  name: "",
  description: "",
  labels: "",
};

export const useEditPlace = (placeId: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, image, bgImage, error, place } = state;
  const router = useRouter();
  const t = useTranslations("OpenYourPlace");

  const { data: session, status } = useSession();
  const url = ` ${process.env.NEXT_PUBLIC_SITE_URL}/api/place/update`;

  const formik = useFormik({
    initialValues: {
      ...initialFormikValues,
    },

    onSubmit: async () => {
      dispatch({ type: "SET_ISLOADING", payload: true });
      const { name, description } = formik.values;
      try {
        const data = {
          id: place?.id,
          name,
          description,
          image,
          bgImage,
          userId: session?.user.id,
        };

        const requestOptions: RequestInit = {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          cache: "no-cache",
        };

        await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/place`,
          requestOptions
        )
          .then((res) => {
            if (res?.ok) {
              dispatch({ type: "SET_IMAGE", payload: "" });
              dispatch({ type: "SET_BGIMAGE", payload: "" });
              router.push("/dashboard");
            } else {
              toast.error(t("error"));
            }
          })
          .catch((error) => {
            toast.error(t("error"));
          })
          .finally(async () => {
            formik.resetForm();
            dispatch({ type: "SET_ISLOADING", payload: false });
          });
      } catch (error) {}
    },
  });

  const isButtonDisabled = useCallback(() => {
    const { name, description } = formik.values;
    if (!placeId) {
      return !name || !description || !image || !bgImage || isLoading;
    } else {
      return isLoading;
    }
  }, [placeId, formik.values, image, bgImage, isLoading]);

  const isOwnerOfPlace = session?.user.id === place?.ownerId;

  useEffect(() => {
    dispatch({ type: "SET_ISLOADING", payload: true });
    if (placeId) {
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/place/?id=${placeId}`, {
        cache: "no-cache",
      })
        .then((res) => res.json())
        .then((res) => {
          dispatch({ type: "SET_PLACE", payload: res[0] });
          dispatch({ type: "SET_IMAGE", payload: res[0].image });
          dispatch({ type: "SET_BGIMAGE", payload: res[0].bgImage });
          formik.setValues({
            name: res[0].name || "", // Use the name from place if available
            description: res[0].description || "",
            labels: "",
          });
        })
        .catch(() => dispatch({ type: "SET_ERROR", payload: true }))
        .finally(() => dispatch({ type: "SET_ISLOADING", payload: false }));
    }
  }, []);

  const setImage = (v: string) => dispatch({ type: "SET_IMAGE", payload: v });
  const setBgImage = (v: string) =>
    dispatch({ type: "SET_BGIMAGE", payload: v });

  return {
    place,
    error,
    isLoading,
    isOwnerOfPlace,
    image,
    setImage,
    bgImage,
    setBgImage,
    formik,
    isButtonDisabled,
    status,
    router,
    t,
  };
};
