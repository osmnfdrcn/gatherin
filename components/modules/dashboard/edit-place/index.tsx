"use client";
import PlaceForm from "@/components/common/place-forrm";
import Title from "@/components/common/title";
import Warning from "@/components/common/warning";
import Spinner from "@/components/layout/spinner";
import { useEditPlace } from "./useEditPlace";

type Props = {
  placeId: string;
};
const EditPlace = ({ placeId }: Props) => {
  const {
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
  } = useEditPlace(placeId);

  if (status !== "authenticated") {
    return <Warning text="auth-warning" />;
  }

  if (error) {
    return <Warning text="404" />;
  }

  if (isLoading) {
    return (
      <div className="w-full h-[500px]">
        <Spinner />
      </div>
    );
  }

  if (isOwnerOfPlace || !place) {
    return (
      <>
        <Title text={place ? t("update-place") : t("open-your-own-place")} />
        <PlaceForm
          values={formik.values}
          handleChange={formik.handleChange}
          handleSubmit={formik.handleSubmit}
          image={image}
          setImage={setImage}
          bgImage={bgImage}
          setBgImage={setBgImage}
          t={t}
          isButtonDisabled={isButtonDisabled}
          isLoading={isLoading}
        />
      </>
    );
  }
};

export default EditPlace;
