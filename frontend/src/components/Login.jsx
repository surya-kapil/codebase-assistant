import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useLogin from "@/hooks/reactQuery/auth/useLogin";
import { regex } from "@/constants";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useLogin();

  const [formData, setFormData] = useState({
    field: "",
    password: "",
  });

  const handleSubmit = event => {
    event.preventDefault();

    const isEmail = regex.email.test(formData.field);
    login({
      username: !isEmail ? formData.field : null,
      email: isEmail ? formData.field : null,
      password: formData.password,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-[460px] rounded-xl border border-gray-300 bg-white p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            {t("heading.login")}
          </h1>

          <input
            type="text"
            placeholder={t("placeholder.userOrEmail")}
            className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            onChange={event =>
              setFormData(prev => ({
                ...prev,
                field: event.target.value,
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
            {isPending ? t("button.loggingIn") : t("button.login")}
          </button>

          <p className="text-center text-sm text-gray-500">
            {t("account.new")}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              {t("button.register")}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
