"use client";
import Button from "@/components/ui/button";
import ImageUpload from "../imageUpload";
import { FaPlus } from "react-icons/fa";
import Title from "@/components/common/title";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Loader from "@/components/layout/loader";

const OpenYourOwnPlace = () => {
  const t = useTranslations("OpenYourPlace");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>("");
  const [bgImage, setBgImage] = useState<string | null>("");
  const { data: session, status } = useSession();

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      labels: "",
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
              router.push("/");
            } else {
              // daha sonra error mesajlarini api'dan al.
              toast.error(t("error"));
            }
          })
          .catch((error) => {
            toast.error(t("error"));
          })
          .finally(() => {
            formik.resetForm();
            setIsLoading(false);
          });
      } catch (error) {}
    },
  });

  const isButtonDisabled = () => {
    const { name, description } = formik.values;
    return !name || !description || !image || !bgImage || isLoading;
  };

  if (status !== "authenticated") {
    return (
      <div className=" p-4 text-lg text-rose-500 font-semibold">
        {t("auth-warning")}
      </div>
    );
  }
  // if (isLoading) {
  //   return <Loader />;
  // }
  return (
    <section className="px-4">
      <Title text={t("open-your-own-place")} />
      <div className="grid grid-cols-4  flex-col">
        <div className="col-span-4 xl:col-span-3  bg-slate-50 h-[calc(100vh-120px)] p-4 flex flex-col gap-4">
          <div className="flex items-center rounded-lg bg-white w-full h-[80px] p-[10px] md:p-0 md:h-[120px]">
            <Button
              variant={"primary"}
              className="bg-slate-800 text-white text-2xl h-[120px] w-[120px] rounded-xl"
            >
              <FaPlus size={30} />
            </Button>
            <ImageUpload
              onChange={(image) => setImage(image)}
              text="Mekan için resim yükle (gerekli)"
              icon={false}
            />
          </div>
          <div className="flex items-center rounded-lg bg-white w-full h-[80px] p-[10px] md:p-0 md:h-[120px]">
            <Button
              variant={"primary"}
              className="bg-slate-800 text-white text-2xl h-[120px] w-[120px] rounded-xl"
            >
              <FaPlus size={30} />
            </Button>
            <ImageUpload
              onChange={(image) => setBgImage(image)}
              text="Mekan için arka plan resmi yükle (gerekli)"
              icon={false}
            />
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-6 p-2 py-10"
          >
            <div className="flex items-center rounded-lg bg-white w-full h-[80px] p-[10px] md:p-0 md:h-[120px]">
              <textarea
                value={formik.values.name}
                name="name"
                onChange={formik.handleChange}
                rows={5}
                className="w-full border-none bg-transparent placeholder:text-sm rounded-lg resize-none border-slate-400 test-sm font-light"
                placeholder={t("place")}
              ></textarea>
            </div>
            <div className="flex items-center rounded-lg bg-white w-full h-[80px] p-[10px] md:p-0 md:h-[120px]">
              <textarea
                value={formik.values.description}
                name="description"
                onChange={formik.handleChange}
                rows={5}
                className="w-full border-none bg-transparent placeholder:text-sm rounded-lg resize-none border-slate-400 test-sm font-light"
                placeholder={t("description")}
              ></textarea>
            </div>

            <div className="flex gap-4 mt-6 justify-end">
              <Button
                type="submit"
                loading={isLoading}
                disabled={isButtonDisabled()}
                variant={"primary"}
                className="bg-slate-800 text-white py-2 px-10 rounded-lg text-lg font-semibold  disabled:bg-slate-800/80"
              >
                {t("save")}
              </Button>
            </div>
          </form>
          <Button
            variant={"primary"}
            className="bg-slate-800 text-white py-2 px-10 rounded-lg text-lg font-semibold "
            onClick={() => router.push("/")}
          >
            {t("close")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OpenYourOwnPlace;
