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
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className="mx-auto mt-32 w-full max-w-md rounded-xl bg-white p-6 shadow-xl outline-none"
      overlayClassName="fixed inset-0 flex items-start justify-center bg-black/40"
    >
      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {t("heading.addRepository")}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {t("description.enterGithubLink")}
          </p>
        </div>

        <input
          type="text"
          placeholder={t("placeholder.repositoryLink")}
          value={repositoryLink}
          onChange={event => setRepositoryLink(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            {t("button.cancel")}
          </button>

          <button
            onClick={handleClick}
            disabled={isPending}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? t("button.addingRepository") : t("button.add")}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddRepository;
