import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useHealthCheck } from "@/hooks/useHealthCheck";

import Loading from "./common/PageLoader";

function Home() {
  const { t } = useTranslation();

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const { data: { welcomeMessage: apiResponse = "" } = {}, isLoading } =
    useHealthCheck(submittedName);

  const handleClick = () => {
    if (!searchKey.trim()) return;

    setSubmittedName(searchKey);
    setIsButtonClicked(true);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">
          {t("welcomeMessage")}
        </h1>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder={t("placeholder.enterName")}
            value={searchKey}
            onChange={event => setSearchKey(event.target.value)}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          <button
            onClick={handleClick}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            {t("button.submit")}
          </button>
        </div>

        <div className="mt-8 min-h-20 rounded-lg bg-gray-100 p-4">
          {isButtonClicked &&
            (isLoading ? (
              <Loading />
            ) : (
              <p className="whitespace-pre-wrap text-gray-800">{apiResponse}</p>
            ))}
        </div>
      </div>
    </main>
  );
}

export default Home;
