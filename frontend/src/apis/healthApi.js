import axios from "axios";
import API_ROUTES from "./apiRoutes";

const fetchHealthCheck = async ({ owner }) => {
  const { data } = await axios.post(API_ROUTES.AUTH.CLONE, {
    owner
  });
  return data;
};

export { fetchHealthCheck };
