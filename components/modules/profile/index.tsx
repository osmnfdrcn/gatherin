"use client";
import ImageUpload from "@/components/modules/imageUpload";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import blankProfileImage from "@/public/images/blank_profile.jpeg";
import { IUser } from "@/types";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
type Props = {
  user: IUser;
};
const UserProfile = ({ user }: Props) => {
  const t = useTranslations("User");
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState<string | null>(user?.image);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const ownProfile = user?.email === session?.user?.email;
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

        await fetch("http://localhost:3000/api/user/update", requestOptions)
          .then((res) => {
            if (res?.ok) {
              toast.success("Kayit basarili");
              router.refresh();
            } else {
              toast.error("An Error Occured");
            }
          })
          .catch((error) => {
            toast.error("An Error Occured");
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
    <div className=" grid grid-cols-3 py-[8px] px-[10px] gap-8 ">
      <div className="col-span-3 xl:col-span-1 ">
        <div className="relative w-full flex flex-col gap-4 p-[25px] bg-slate-50 rounded-xl shadow-md">
          <div className="flex justify-start items-center gap-4">
            <Image
              src={user?.image || blankProfileImage}
              width={96}
              height={96}
              alt="blank profile image"
              className="rounded-full"
            />
            <div className="flex flex-col ">
              <p className="text-slate-800 text-2xl font-semibold">
                {user?.name}
              </p>
            </div>
          </div>
          <div className="w-full border-t-[1px] border-b-[1px] border-steel-blue py-6">
            <p className=" text-slate-500 font-bold mb-[10px]">Bio</p>
            <p className="font-light text-slate-600">{user?.bio}</p>
          </div>
          {!ownProfile && session ? (
            <Button className="bg-steel-blue w-full py-2 rounded-lg hover:bg-steel-blue/90 text-white ">
              {t("add-friend")}
            </Button>
          ) : null}

          {ownProfile ? (
            <p
              className="absolute top-2 right-2 font-semibold text-sm text-slate-600 cursor-pointer"
              onClick={() => setIsEditing(!isEditing)}
            >
              {t("edit")}
            </p>
          ) : null}
        </div>
        <div className="w-full flex flex-col gap-4 px-[25px] bg-slate-50 rounded-xl mt-4 shadow-lg">
          <div className="w-full  py-6">
            <p className=" text-slate-500 font-bold mb-[10px]">
              {" "}
              {t("my-places")}
            </p>
            <div className="">
              {user?.places.map((p) => {
                return (
                  <div
                    className="text-sm font-semibold text-slate-600 flex gap-2"
                    key={p.id}
                  >
                    <p className="text-steel-blue"> {t("owner-of")}</p>
                    <Link href={`/place/${p.id}`}>{p.name}</Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {isEditing ? (
        <div className="col-span-3 xl:col-span-2 py-[8px] px-[10px] rounded-xl  bg-slate-50 xl: h-[calc(100vh-120px)] shadow-lg">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-6 p-2 py-10"
          >
            <div className="col-span-2 p-2 rounded-xl border border-slate-400">
              <ImageUpload onChange={(image) => setImage(image)} icon={false} />
            </div>
            <div className="w-full flex justify-between items-center gap-10">
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
            <div className="flex gap-4 mt-6 justify-end">
              {/* <Button
                variant={"primary"}
                className="bg-slate-800 text-white py-2 px-10 rounded-lg text-lg font-semibold "
              >
                Close
              </Button> */}
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
      ) : // <div className=""> DATA</div>
      null}
    </div>
  );
};

export default UserProfile;
