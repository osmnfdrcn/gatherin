"use client";

import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { IoCloseSharp } from "react-icons/io5";
import useRegister from "./useRegister";

const RegisterModal = () => {
  const {
    isButtonDisabled,
    formik,
    showRegisterModal,
    t,
    isLoading,
    handleLoginClick,
    handleModalClose,
  } = useRegister();

  if (showRegisterModal) {
    return (
      <div className="fixed z-50 inset-0 bg-gray-800 bg-opacity-60 overflow-y-auto h-full w-full flex items-center justify-center px-2 ">
        <div className="relative bg-white w-full md:w-[600px] h-[95vh]  rounded-xl flex flex-col items-center justify-center p-[10px]">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col  items-center justify-center gap-4 md:p-[20px] "
          >
            <h5 className="w-full text-rose-700 font-bold text-4xl md:text-5xl text-center col-span-2 md:mb-4">
              {t("welcome")}!
            </h5>
            <div className="relative w-full  flex flex-col gap-1 ">
              <Input
                className="w-full bg-blue-50 border-none rounded-xl py-[25px]  px-[25px]  md:py-[30px]"
                name="name"
                type="text"
                placeholder={t("name")}
                onChange={formik.handleChange}
                value={formik?.values.name}
              />
              {formik.errors.name && formik.touched.name && (
                <p className=" text-xs text-rose-500 ">
                  {t(formik?.errors?.name)}
                </p>
              )}
            </div>

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
            <div className="relative w-full  flex flex-col gap-1 ">
              <Input
                className="w-full bg-blue-50 border-none rounded-xl py-[25px]  px-[25px]  md:py-[30px]"
                name="confirmPassword"
                type="password"
                placeholder={t("confirm-password")}
                onChange={formik.handleChange}
                value={formik?.values.confirmPassword}
              />
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <p className=" text-xs text-rose-500 ">
                    {t(formik?.errors?.confirmPassword)}
                  </p>
                )}
            </div>
            <Button
              loading={isLoading}
              type="submit"
              variant={"primary"}
              className="w-full bg-red-700 py-[10px] md:py-[15px] text-white font-bold text-sm md:text-lg rounded-lg col-span-2 disabled:bg-red-800"
              disabled={isButtonDisabled()}
            >
              {t("create-a-new-account")}
            </Button>
          </form>
          {/* social login */}
          <div className="w-full flex flex-col items-center justify-start md:p-[20px] ">
            <p className="text-slate-700 font-semibold text-sm">{t("or")}</p>
            <div className="w-full flex items-center justify-between gap-2">
              <Button
                variant={"primary"}
                className="w-full bg-slate-700  py-[10px] md:py-[15px] text-white font-bold text-sm  md:text-lg rounded-lg"
                onClick={() => signIn("google")}
              >
                {t("join-with-google")}
              </Button>
              <Button
                variant={"primary"}
                className="w-full bg-slate-700  py-[10px] md:py-[15px] text-white font-bold text-sm md:text-lg rounded-lg"
                onClick={() => signIn("github")}
              >
                {t("join-with-github")}
              </Button>
            </div>
          </div>

          <div className="w-full border-slate-600 flex flex-col items-center justify-center gap-1  p-[10px] md:p-[20px] mt-5 col-span-2">
            <span className="text-slate-600 text-lg font-semibold">
              {t("already-a-member")}
            </span>
            <span
              className="text-rose-700 text-lg font-semibold cursor-pointer underline"
              onClick={handleLoginClick}
            >
              {t("login")}
            </span>
          </div>
          <div className="absolute top-2 right-2 cursor-pointer">
            <IoCloseSharp size={30} onClick={handleModalClose} />
          </div>
        </div>
      </div>
    );
  }
};
export default RegisterModal;
