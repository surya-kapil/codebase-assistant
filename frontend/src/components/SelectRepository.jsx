import useFetchRepositories from "@/hooks/reactQuery/repository/useFetchRepositories";
import { useTranslation } from "react-i18next";

const SelectRepository = ({ setSelectedRepository }) => {
  const { data: repositories = [] } = useFetchRepositories();
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("heading.selectRepository")}</h1>
      <select onChange={event => setSelectedRepository(event.target.value)}>
        <option value="">{t("option.selectRepository")}</option>

        {repositories.map(repository => (
          <option key={repository.id} value={repository.id}>
            {repository.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectRepository;
