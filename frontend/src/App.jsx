import { Routes, Route } from "react-router-dom";
import Home from "./components";
import ROUTES from "./routes";
import PageNotFound from "./components/common/PageNotFound";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
