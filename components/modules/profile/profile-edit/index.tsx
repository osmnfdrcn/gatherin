"use client";
import ImageUpload from "@/components/modules/image-upload";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useProfileEdit from "./useProfileEdit";

type Props = {
  setIsEditing: (v: boolean) => void;
};

const ProfileEdit = ({ setIsEditing }: Props) => {
  const { formik, setImage, t, isLoading } = useProfileEdit(setIsEditing);

  return (
    <div className="col-span-3 xl:col-span-2  px-[10px] rounded-xl  bg-slate-50 xl: h-auto shadow-lg">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-6 p-2 py-10"
      >
        <div className="col-span-2  rounded-xl border border-slate-400">
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
