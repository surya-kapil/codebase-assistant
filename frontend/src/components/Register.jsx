import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRegister } from "@/hooks/reactQuery/useRegister";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate: registerUser, isPending } = useRegister();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleSubmit = event => {
    event.preventDefault();
    registerUser({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-[460px] rounded-xl border border-gray-300 bg-white p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            {t("heading.register")}
          </h1>

          <input
            type="text"
            placeholder={t("placeholder.username")}
            className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            onChange={event =>
              setFormData(prev => ({
                ...prev,
                username: event.target.value,
              }))
            }
          />

          <input
            type="email"
            placeholder={t("placeholder.email")}
            className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            onChange={event =>
              setFormData(prev => ({
                ...prev,
                email: event.target.value,
              }))
            }
          />

          <input
            type="password"
            placeholder={t("placeholder.password")}
            className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            onChange={event =>
              setFormData(prev => ({
                ...prev,
                password: event.target.value,
              }))
            }
          />

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2.5 font-medium text-white transition hover:bg-blue-700"
            disabled={isPending}
          >
            {isPending ? t("button.registering") : t("button.register")}
          </button>

          <p className="text-center text-sm text-gray-500">
            {t("account.old")}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              {t("button.login")}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
