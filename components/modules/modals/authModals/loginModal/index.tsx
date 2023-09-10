"use client";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  setShowLoginModal,
  setShowRegisterModal,
} from "@/store/slices/appSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";

const LoginModal = () => {
  const t = useTranslations("Auth");
  const dispatch = useAppDispatch();
  const { showLoginModal } = useAppSelector((store: RootState) => store.app);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {};
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
      try {
      } catch (error) {}
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

  if (showLoginModal) {
    return (
      <div className="fixed z-50 inset-0 bg-gray-800 bg-opacity-60 overflow-y-auto h-full w-full flex items-center justify-center px-2 ">
        <div className="relative bg-white w-full md:w-[600px] h-[95vh]  rounded-xl flex flex-col items-center justify-center p-[10px]">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col  items-center justify-center gap-4 md:p-[20px] "
          >
            <h5 className="w-full text-rose-700 font-bold text-4xl md:text-5xl text-center col-span-2 md:mb-4">
              {t("welcome-back")}!
            </h5>
            <div className="relative w-full  flex flex-col gap-1">
              <Input
                className="w-full bg-blue-50 border-none rounded-xl py-[25px]  px-[25px]  md:py-[30px]"
                name="email"
                type="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik?.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <p className=" text-xs text-rose-500 ">
                  {t(formik?.errors?.email)}
                </p>
              )}
            </div>
            <div className="relative w-full flex flex-col gap-1 ">
              <Input
                className="w-full bg-blue-50 border-none rounded-xl py-[25px]  px-[25px]  md:py-[30px]"
                name="password"
                type="password"
                placeholder={t("password")}
                onChange={formik.handleChange}
                value={formik?.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <p className=" text-xs text-rose-500 ">
                  {t(formik?.errors?.password)}
                </p>
              )}
            </div>
            <Button
              type="submit"
              variant={"primary"}
              className="w-full bg-red-700 py-[15px] text-white font-bold text-lg rounded-lg  col-span-2 disabled:bg-red-800"
              loading={isLoading}
              disabled={isButtonDisabled()}
            >
              {t("login")}
            </Button>
          </form>
          {/* social login */}
          <div className="w-full flex flex-col items-center justify-start md:p-[20px] ">
            <p className="text-slate-700 font-semibold text-md"> {t("or")}</p>
            <div className="w-full flex items-center justify-between gap-2">
              <Button
                variant={"primary"}
                className="w-full bg-slate-700 py-[15px] text-white font-bold text-lg rounded-lg"
                onClick={() => signIn("google")}
              >
                {t("login-with-google")}
              </Button>
              <Button
                variant={"primary"}
                className="w-full bg-slate-700 py-[15px] text-white font-bold text-lg rounded-lg"
                onClick={() => signIn("github")}
              >
                {t("login-with-github")}
              </Button>
            </div>
          </div>

          <div className="w-full border-slate-600 flex flex-col items-center justify-center gap-2 p-[20px] mt-5 col-span-2">
            <span className="text-slate-600 text-xl font-semibold">
              {t("new-to-gather-in")}
            </span>
            <span
              className="text-rose-700 text-xl font-semibold cursor-pointer underline"
              onClick={handleSignUpClick}
            >
              {t("sign-up")}
            </span>
          </div>
          <div className="absolute top-2 right-2 cursor-pointer">
            <IoCloseSharp
              size={30}
              onClick={() => dispatch(setShowLoginModal(false))}
            />
          </div>
        </div>
      </div>
    );
  }
};
export default LoginModal;
