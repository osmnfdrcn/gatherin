"use client";
import { useTranslations } from "next-intl";
import { ImWarning } from "react-icons/im";

const AuthRequired = () => {
  const t = useTranslations("OpenYourPlace");

  return (
    <div className="w-full bg-slate-100 flex items-center justify-center p-10 mt-4 rounded-lg">
      <div className="flex flex-col items-center justify-center gap-4">
        <ImWarning size={40} />
        <p className="text-slate-800 font-semibold text-2xl text-center">
          {t("auth-warning")}
        </p>
      </div>
    </div>
  );
};

export default AuthRequired;
