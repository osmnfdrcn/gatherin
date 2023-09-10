"use client";
import ImageUpload from "@/components/modules/image-upload";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
type Props = {
  setIsEditing: (v: boolean) => void;
};

const ProfileEdit = ({ setIsEditing }: Props) => {
  const t = useTranslations("User");
  const { data: session } = useSession();
  const [image, setImage] = useState<string | null>(session?.user.image || "");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      bio: "",
    },
    onSubmit: async () => {
      setIsLoading(true);
      const { name, bio } = formik.values;
      try {
        const data = {
          name,
          bio,
          image,
          id: session?.user.id,
        };

        const requestOptions: RequestInit = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        };

        await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/user/update`,
          requestOptions
        )
          .then((res) => {
            if (res?.ok) {
              toast.success(t("success"));
              router.refresh();
            } else {
              toast.error(t("error"));
            }
          })
          .catch((error) => {
            toast.error(t("error"));
          })
          .finally(() => {
            formik.resetForm();
            setIsLoading(false);
            setIsEditing(false);
          });
      } catch (error) {}
    },
  });
  return (
    <div className="col-span-3 xl:col-span-2  px-[10px] rounded-xl  bg-slate-50 xl: h-auto shadow-lg">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-6 p-2 py-10"
      >
        <div className="col-span-2 px-2 rounded-xl border border-slate-400">
          <ImageUpload onChange={(image) => setImage(image)} icon={false} />
        </div>
        <div className="w-full flex justify-between items-center ">
          <Input
            type="text"
            value={formik.values.name}
            name="name"
            placeholder={t("name")}
            onChange={formik.handleChange}
            className="border border-slate-400 bg-transparent rounded-lg"
          />
        </div>
        <textarea
          value={formik.values.bio}
          name="bio"
          onChange={formik.handleChange}
          rows={5}
          className="bg-transparent placeholder:text-sm rounded-lg resize-none border-slate-400 test-sm font-light"
          placeholder="Bio"
        ></textarea>
        <div className="flex gap-4 mt-2 justify-end">
          <Button
            type="submit"
            loading={isLoading}
            variant={"primary"}
            className="bg-slate-800 text-white py-2 px-10 rounded-lg text-lg font-semibold "
          >
            {t("save")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
