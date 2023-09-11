"use client";
import AuthRequired from "@/components/common/protected";
import Title from "@/components/common/title";
import Button from "@/components/ui/button";
import { IPlace } from "@/types";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import ImageUpload from "../image-upload";

type Props = {
  placeId?: string;
};
const OpenYourOwnPlace = ({ placeId }: Props) => {
  const [place, setPlace] = useState<IPlace | null>(null);
  const [image, setImage] = useState<string>("");
  const [bgImage, setBgImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations("OpenYourPlace");

  const { data: session, status, update } = useSession();
  const url = ` ${process.env.NEXT_PUBLIC_SITE_URL}/api/place/${
    place ? "update" : "create"
  }`;

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: place?.name,
      description: place?.description,
      labels: "",
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
          method: placeId ? "PATCH" : "POST",
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
              !placeId ? router.push("/") : router.push("/dashboard");
            } else {
              toast.error(t("error"));
            }
          })
          .catch((error) => {
            toast.error(t("error"));
          })
          .finally(async () => {
            await update();
            formik.resetForm();
            setIsLoading(false);
          });
      } catch (error) {}
    },
  });

  const isButtonDisabled = () => {
    const { name, description } = formik.values;
    if (!placeId) {
      return !name || !description || !image || !bgImage || isLoading;
    } else {
      return isLoading;
    }
  };

  if (status !== "authenticated") {
    return <AuthRequired />;
  }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/place/?id=${placeId}`, {
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((res) => {
        setPlace(res[0]);
        setBgImage(res[0].bgImage);
        setImage(res[0].image);
      });
  }, []);

  const isOwnerOfPlace = session.user.id === place?.ownerId;
  if (isOwnerOfPlace) {
    return (
      <>
        <Title text={place ? t("update-place") : t("open-your-own-place")} />
        <div className="grid grid-cols-4  flex-col">
          <div className="col-span-4 xl:col-span-3  bg-slate-50 h-[calc(100vh-120px)] p-4 flex flex-col gap-4">
            <div className="flex items-center rounded-lg bg-white w-full  p-[10px] md:p-0 md:h-[100px]">
              <ImageUpload
                image={image}
                onChange={(image) => setImage(image)}
                text="Mekan için resim yükle (gerekli)"
                icon={false}
              />
            </div>
            <div className="flex items-center rounded-lg bg-white w-full  p-[10px] md:p-0 md:h-[100px]">
              <ImageUpload
                image={bgImage}
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
                  value={formik.values.name || place?.name}
                  name="name"
                  onChange={formik.handleChange}
                  rows={5}
                  className="w-full border-none bg-transparent placeholder:text-sm rounded-lg resize-none border-slate-400 test-sm font-light"
                  placeholder={t("place")}
                ></textarea>
              </div>
              <div className="flex items-center rounded-lg bg-white w-full h-[80px] p-[10px] md:p-0 md:h-[120px]">
                <textarea
                  value={formik.values.description || place?.description}
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
      </>
    );
  }
};

export default OpenYourOwnPlace;
