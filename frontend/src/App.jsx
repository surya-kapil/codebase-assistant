import { Routes, Route, Navigate } from "react-router-dom";
import ROUTES from "./routes";
import PageNotFound from "./components/common/PageNotFound";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route
        path={ROUTES.ROOT}
        element={<Navigate to={ROUTES.DASHBOARD} replace />}
      />

      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
      </Route>

      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
