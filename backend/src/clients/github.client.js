import { extractRepositoryDetails } from "../utils/repository.utils.js";

export const fetchRepositoryDetails = async ({ repositoryLink }) => {
  const { owner, repositoryName } = extractRepositoryDetails({
    repositoryLink,
  });
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repositoryName}`
  );

  const { default_branch } = await response.json();

  return { repositoryName, default_branch };
};
