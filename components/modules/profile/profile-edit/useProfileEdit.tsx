import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const useProfileEdit = (setIsEditing: (v: boolean) => void) => {
  const t = useTranslations("User");
  const { data: session } = useSession();
  const [image, setImage] = useState(session?.user.image || "");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    const { name, bio } = formik.values;
    try {
      const data = {
        name,
        bio,
        image,
        id: session?.user.id,
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      const response = await fetch(`/api/user/update`, requestOptions);

      if (response.ok) {
        toast.success(t("success"));
        router.refresh();
      } else {
        toast.error(t("error"));
      }
    } catch (error) {
      toast.error(t("error"));
    } finally {
      formik.resetForm();
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      bio: "",
    },
    onSubmit: handleSubmit,
  });

  return { formik, setImage, t, isLoading };
};

export default useProfileEdit;
