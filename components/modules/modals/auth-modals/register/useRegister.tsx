import React, { useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import {
  setShowLoginModal,
  setShowRegisterModal,
} from "@/store/slices/appSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import RegisterSchema from "./RegisterSchema";
import { useTranslations } from "next-intl";

const useRegister = () => {
  const t = useTranslations("Auth");
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { showRegisterModal } = useAppSelector((store: RootState) => store.app);

  const handleLoginClick = () => {
    formik.resetForm();
    dispatch(setShowLoginModal(true));
    dispatch(setShowRegisterModal(false));
  };

  const handleModalClose = () => {
    formik.resetForm();
    dispatch(setShowRegisterModal(false));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      setIsLoading(true);
      const { name, email, password } = formik.values;

      try {
        const data = {
          name,
          email,
          password,
        };

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        };

        await fetch("/api/user/register/", requestOptions)
          .then((res) => {
            if (res?.ok) {
              toast.success("Kayit basarili");
              dispatch(setShowLoginModal(true));
            } else {
              toast.error(
                "Kayitli email. Baska bir email ile kaydolmayi deneyin!"
              );
            }
          })
          .catch((error) => {
            console.log({ error });
            toast.error("Hata");
          })
          .finally(() => {
            dispatch(setShowRegisterModal(false));
            setIsLoading(false);
            formik.resetForm();
          });
      } catch (error) {
        toast.error("Hata");
      }
    },
  });

  const isButtonDisabled = () => {
    const { name, email, password, confirmPassword } = formik.values;
    return !name || !email || !password || !confirmPassword || isLoading;
  };

  return {
    isButtonDisabled,
    formik,
    showRegisterModal,
    t,
    isLoading,
    handleLoginClick,
    handleModalClose,
  };
};

export default useRegister;
