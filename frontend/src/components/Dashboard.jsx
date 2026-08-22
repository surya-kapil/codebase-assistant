import { useState } from "react";
import { useLogout } from "@/hooks/reactQuery/auth/useLogout";
import AddRepository from "./AddRepository";
import SelectRepository from "./SelectRepository";
import QueryRepository from "./QueryRepository";

const Dashboard = () => {
  const { mutate: logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRepository, setSelectedRepository] = useState(null);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <h1 className="text-lg font-semibold text-gray-900">
            Codebase Assistant
          </h1>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              Logout
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Add repository
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="space-y-6">
          <section className="rounded-lg border border-gray-200 bg-white p-6">
            <SelectRepository setSelectedRepository={setSelectedRepository} />
          </section>

          <section className="rounded-lg border border-gray-200 bg-white p-6">
            <QueryRepository selectedRepository={selectedRepository} />
          </section>
        </div>
      </main>

      <AddRepository isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Dashboard;
