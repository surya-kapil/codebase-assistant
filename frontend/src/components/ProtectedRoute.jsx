import useAuth from "@/hooks/reactQuery/auth/useAuth";
import useAuthStore from "@/stores/useAuthStore";
import { Navigate, Outlet } from "react-router";
import PageLoader from "./common/PageLoader";

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const { isLoading } = useAuth();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
