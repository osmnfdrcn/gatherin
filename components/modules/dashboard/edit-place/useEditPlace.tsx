import { IPlace } from "@/types";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useEditPlace = (placeId: string) => {
  const [place, setPlace] = useState<IPlace | null>(null);
  const [image, setImage] = useState<string>("");
  const [bgImage, setBgImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const t = useTranslations("OpenYourPlace");

  const { data: session, status } = useSession();
  const url = ` ${process.env.NEXT_PUBLIC_SITE_URL}/api/place/update`;

  const formik = useFormik({
    initialValues: {
      ...initialFormikValues,
    },

    onSubmit: async () => {
      setIsLoading(true);
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
    if (!placeId) {
      return !name || !description || !image || !bgImage || isLoading;
    } else {
      return isLoading;
    }
  }, [placeId, formik.values, image, bgImage, isLoading]);

  const isOwnerOfPlace = session?.user.id === place?.ownerId;

  useEffect(() => {
    setIsLoading(true);
    if (placeId) {
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/place/?id=${placeId}`, {
        cache: "no-cache",
      })
        .then((res) => res.json())
        .then((res) => {
          setPlace(res[0]);
          setBgImage(res[0].bgImage);
          setImage(res[0].image);
          formik.setValues({
            name: res[0].name || "", // Use the name from place if available
            description: res[0].description || "",
            labels: "",
          });
        })
        .catch(() => setError(true))
        .finally(() => setIsLoading(false));
    }
  }, []);

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

const initialFormikValues = {
  name: "",
  description: "",
  labels: "",
};
