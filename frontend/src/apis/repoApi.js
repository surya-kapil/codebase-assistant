import axios from "axios";
import API_ROUTES from "./apiRoutes";

export const addRepository = async ({ repositoryLink }) => {
  await axios.post(API_ROUTES.REPOSITORY.CLONE, {
    repositoryLink,
  });
};

export const fetchRepositories = async () => {
  const { data } = await axios.get(API_ROUTES.REPOSITORY.FETCH);
  return data.repositories;
};

export const queryRepository = async ({ query, repositoryId }) => {
  const { data } = await axios.post(API_ROUTES.REPOSITORY.QUERY, {
    repositoryId,
    query,
  });

  return data.response;
};
