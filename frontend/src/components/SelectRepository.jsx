import useFetchRepositories from "@/hooks/reactQuery/repository/useFetchRepositories";
import { useTranslation } from "react-i18next";

const SelectRepository = ({ setSelectedRepository }) => {
  const { data: repositories = [] } = useFetchRepositories();
  const { t } = useTranslation();

  return (
    <div className="max-w-md">
      <label
        htmlFor="repository"
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        {t("heading.selectRepository")}
      </label>

      <select
        id="repository"
        onChange={event => setSelectedRepository(event.target.value)}
        className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm outline-none transition hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        <option value="">{t("option.selectRepository")}</option>

        {repositories.map(repository => (
          <option key={repository.id} value={repository.id}>
            {repository.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectRepository;
