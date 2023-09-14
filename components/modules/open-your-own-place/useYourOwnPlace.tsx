import { IPlace } from "@/types";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useYourOwnPlace = () => {
  const [image, setImage] = useState<string>("");
  const [bgImage, setBgImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const t = useTranslations("OpenYourPlace");

  const { data: session, status } = useSession();
  const url = ` ${process.env.NEXT_PUBLIC_SITE_URL}/api/place/create"`;

  const formik = useFormik({
    initialValues: {
      ...initialFormikValues,
    },

    onSubmit: async () => {
      setIsLoading(true);
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

        await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/place`,
          requestOptions
        )
          .then((res) => {
            if (res?.ok) {
              toast.success(t("success"));
              setImage("");
              setBgImage("");
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
            setIsLoading(false);
          });
      } catch (error) {}
    },
  });

  const isButtonDisabled = useCallback(() => {
    const { name, description } = formik.values;
    return !name || !description || !image || !bgImage || isLoading;
  }, [formik.values, image, bgImage, isLoading]);

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
    router,
    t,
  };
};

const initialFormikValues = {
  name: "",
  description: "",
  labels: "",
};
