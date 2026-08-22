import { useLogout } from "@/hooks/reactQuery/auth/useLogout";
import AddRepository from "./AddRepository";
import { useState } from "react";
import SelectRepository from "./SelectRepository";

const Dashboard = () => {
  const { mutate: logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRepository, setSelectedRepository] = useState(null);

  console.log(selectedRepository);
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <h1>Normal Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => setIsOpen(true)}>Show Modal</button>
      <AddRepository {...{ isOpen, setIsOpen }} />
      <SelectRepository {...{ setSelectedRepository }} />
    </>
  );
};

export default Dashboard;
