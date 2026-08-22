import useAuth from "@/hooks/reactQuery/auth/useAuth";
import { Navigate, Outlet } from "react-router";
import PageLoader from "./common/PageLoader";

const ProtectedRoute = () => {
  const { isLoading, isError } = useAuth();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
