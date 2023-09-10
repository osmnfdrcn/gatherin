"use client";
import Button from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

const uploadPreset = "gqte2oos";

interface ImageUploadProps {
  onChange: (value: string) => void;
  text?: string;
  icon: boolean;
}

const ImageUpload = ({
  onChange,
  text = "* Upload drag and drop SVG, PNG, JPG",
  icon = true,
}: ImageUploadProps) => {
  const [images, setImages] = useState<string[]>([]);
  const t = useTranslations("User");

  const handleUpload = useCallback(
    (result: any) => {
      const updatedImages = [result.info.secure_url];
      setImages(updatedImages);
      onChange(result.info.secure_url);
    },
    [onChange, images]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFileSize: 4000000,
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="w-full relative cursor-pointer hover:opacity-70         p-3  border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 h-[100px]"
          >
            {icon ? <TbPhotoPlus size={20} /> : null}
            {!images.length ? (
              <div className="w-full font-semibold text-sm flex justify-center">
                {t("upload")}
              </div>
            ) : null}

            <div className="absolute top-0 left-0  w-[100px] h-[100px] flex items-center justify-between ">
              {images.length ? (
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src={images[0] || "/images/imageUpload.png"}
                  alt=""
                  className="rounded-full p-1"
                />
              ) : (
                <div className="bg-slate-800 text-white text-2xl h-full w-full rounded-xl flex items-center justify-center">
                  <FaPlus size={30} />
                </div>
              )}
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
