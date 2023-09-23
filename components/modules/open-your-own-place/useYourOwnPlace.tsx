import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useReducer } from "react";
import toast from "react-hot-toast";
import { initialState, reducer } from "./reducer";

const initialFormikValues = {
  name: "",
  description: "",
  labels: "",
};

export const useYourOwnPlace = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, image, bgImage, error } = state;

  const router = useRouter();
  const t = useTranslations("OpenYourPlace");

  const { data: session, status } = useSession();
  const url = ` /api/place/create"`;

  const formik = useFormik({
    initialValues: {
      ...initialFormikValues,
    },

    onSubmit: async () => {
      dispatch({ type: "SET_ISLOADING", payload: true });
      const { name, description } = formik.values;
      try {
        const data = {
          name,
          description,
          image,
          bgImage,
          userId: session?.user.id,
        };

        const requestOptions: RequestInit = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          cache: "no-cache",
        };

        await fetch(`/api/place`, requestOptions)
          .then((res) => {
            if (res?.ok) {
              toast.success(t("success"));
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
    return !name || !description || !image || !bgImage || isLoading;
  }, [formik.values, image, bgImage, isLoading]);

  const setImage = (v: string) => dispatch({ type: "SET_IMAGE", payload: v });
  const setBgImage = (v: string) =>
    dispatch({ type: "SET_BGIMAGE", payload: v });

  return {
    error,
    isLoading,
    image,
    setImage,
    bgImage,
    setBgImage,
    formik,
    isButtonDisabled,
    status,
    t,
  };
};
