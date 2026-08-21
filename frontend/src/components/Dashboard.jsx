import { useLogout } from "@/hooks/reactQuery/useLogout";

const Dashboard = () => {
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <h1>Normal Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Dashboard;
