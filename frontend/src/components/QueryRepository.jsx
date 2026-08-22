import useQueryRepository from "@/hooks/reactQuery/repository/useQueryRepository";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const QueryRepository = ({ selectedRepository }) => {
  const [query, setQuery] = useState("");
  const { t } = useTranslation();

  const {
    refetch,
    data: response = "",
    isFetching,
  } = useQueryRepository({
    query,
    repositoryId: selectedRepository,
  });

  const handleClick = () => {
    refetch();
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          {t("heading.queryRepository")}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {t("description.queryRepository")}
        </p>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder={t("placeholder.query")}
          onChange={event => setQuery(event.target.value)}
          value={query}
          className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        />

        <button
          onClick={handleClick}
          disabled={isFetching || !selectedRepository || !query.trim()}
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isFetching ? "..." : t("button.ask")}
        </button>
      </div>

      <div>
        <textarea
          value={response || ""}
          readOnly
          className="min-h-96 w-full resize-y rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-800 outline-none"
          placeholder={t("placeholder.response")}
        />
      </div>
    </div>
  );
};

export default QueryRepository;
