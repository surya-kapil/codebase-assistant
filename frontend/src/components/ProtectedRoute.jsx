import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import useAuth from "@/hooks/reactQuery/auth/useAuth";
import PageLoader from "./common/PageLoader";
import displayToastr from "@/utils/displayToastr";

const ProtectedRoute = () => {
  const { isLoading, isError } = useAuth();

  useEffect(() => {
    if (isError) {
      displayToastr({
        isSuccess: false,
        message: "Session expired",
      });
    }
  }, [isError]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
