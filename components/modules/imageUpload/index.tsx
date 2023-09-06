"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useState } from "react";
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
            className="relative cursor-pointer hover:opacity-70              p-3              border-neutral-300 flex flex-col justify-center               items-center gap-4 text-neutral-600"
          >
            {icon ? <TbPhotoPlus size={20} /> : null}
            <div className="font-semibold text-sm">{t("upload")}</div>
            {images.length ? (
              <div className="absolute inset-0 w-[70px] h-[70px] flex items-center justify-between p-10">
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src={images[0] || "/images/imageUpload.png"}
                  alt=""
                  className="rounded-full"
                />
              </div>
            ) : null}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
