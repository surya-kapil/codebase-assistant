import ROUTES from "@/routes";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-900">{t("page.notFound")}</h1>

      <NavLink
        to={ROUTES.DASHBOARD}
        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
      >
        {t("button.returnHome")}
      </NavLink>
    </div>
  );
};

export default PageNotFound;
