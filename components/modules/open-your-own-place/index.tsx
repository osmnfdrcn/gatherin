"use client";
import Title from "@/components/common/title";
import Warning from "@/components/common/warning";
import Spinner from "@/components/layout/spinner";
import PlaceForm from "@/components/common/place-forrm";
import { useYourOwnPlace } from "./useYourOwnPlace";

const OpenYourOwnPlace = () => {
  const {
    error,
    isLoading,
    image,
    setImage,
    bgImage,
    setBgImage,
    formik,
    isButtonDisabled,
    status,
    t,
  } = useYourOwnPlace();

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

  return (
    <>
      <Title text={t("open-your-own-place")} />
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
};

export default OpenYourOwnPlace;
