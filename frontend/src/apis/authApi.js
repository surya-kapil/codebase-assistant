import axios from "axios";
import API_ROUTES from "./apiRoutes";
import filterNullishValues from "@/utils/filterNullishValues";

export const register = async ({ username, email, password }) => {
  await axios.post(API_ROUTES.AUTH.REGISTER, {
    username,
    email,
    password,
  });
};

export const login = async requestObject => {
  await axios.post(API_ROUTES.AUTH.LOGIN, filterNullishValues(requestObject));
};
