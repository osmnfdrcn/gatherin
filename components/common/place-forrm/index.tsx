"use client";
import ImageUpload from "@/components/modules/image-upload";
import Button from "@/components/ui/button";
import router from "next/router";
type Props = {
  values: {
    name: string;
    description: string;
  };
  handleSubmit: () => void;
  handleChange: (e: React.ChangeEvent) => void;

  image: string;
  setImage: (v: string) => void;
  bgImage: string;
  setBgImage: (v: string) => void;
  t: (v: string) => string;
  isLoading: boolean;
  isButtonDisabled: () => boolean;
};

const PlaceForm = ({
  values,
  handleChange,
  handleSubmit,
  image,
  setImage,
  bgImage,
  setBgImage,
  t,
  isLoading,
  isButtonDisabled,
}: Props) => {
  return (
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-2 py-10">
          <div className="flex items-center rounded-lg bg-white w-full h-[80px] p-[10px] md:p-0 md:h-[120px]">
            <textarea
              value={values.name}
              name="name"
              onChange={handleChange}
              rows={5}
              className="w-full border-none bg-transparent splaceholder:text-sm rounded-lg resize-none border-slate-400 test-sm font-light"
              placeholder={t("place")}
            ></textarea>
          </div>
          <div className="flex items-center rounded-lg bg-white w-full h-[80px] p-[10px] md:p-0 md:h-[120px]">
            <textarea
              value={values.description}
              name="description"
              onChange={handleChange}
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
  );
};

export default PlaceForm;
