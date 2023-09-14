import React, { useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import {
  setShowLoginModal,
  setShowRegisterModal,
} from "@/store/slices/appSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";

const useLogin = () => {
  const t = useTranslations("Auth");
  const dispatch = useAppDispatch();

  const { showLoginModal } = useAppSelector((store: RootState) => store.app);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUpClick = () => {
    dispatch(setShowLoginModal(false));
    dispatch(setShowRegisterModal(true));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async () => {
      setIsLoading(true);
      const { email, password } = formik.values;

      signIn("credentials", {
        email: email.toLowerCase(),
        password,
        redirect: false,
      })
        .then((callback) => {
          setIsLoading(false);
          dispatch(setShowLoginModal(false));

          if (!callback?.error) {
            toast.success("Giris basarili!");
          }
          if (callback?.error) {
            toast.error(callback.error);
          }
        })
        .finally(() => {
          dispatch(setShowLoginModal(false));
          setIsLoading(false);
          formik.resetForm();
        });
    },
  });

  const isButtonDisabled = () => {
    const { email, password } = formik.values;
    return !email || !password || isLoading;
  };

  return {
    showLoginModal,
    formik,
    t,
    isLoading,
    isButtonDisabled,
    handleSignUpClick,
    dispatch,
  };
};

export default useLogin;
