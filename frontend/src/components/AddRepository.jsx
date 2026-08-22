import { useAddRepository } from "@/hooks/reactQuery/repository/useAddRepository";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";

const AddRepository = ({ isOpen, setIsOpen }) => {
  const [repositoryLink, setRepositoryLink] = useState("");
  const { mutate: addRepository, isPending } = useAddRepository();

  const handleClick = () => {
    addRepository({ repositoryLink });
  };

  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
      <input
        type="text"
        placeholder={t("placeholder.repositoryLink")}
        value={repositoryLink}
        onChange={event => setRepositoryLink(event.target.value)}
      />
      <button onClick={handleClick} disabled={isPending}>
        {isPending ? t("button.addingRepository") : t("button.add")}
      </button>
    </Modal>
  );
};

export default AddRepository;
