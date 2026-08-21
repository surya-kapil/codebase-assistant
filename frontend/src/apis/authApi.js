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

export const checkMe = async () => {
  const {
    data: { userId },
  } = await axios.post(API_ROUTES.AUTH.ME);
  return userId;
};

export const logout = async () => {
  await axios.post(API_ROUTES.AUTH.LOGOUT);
};
