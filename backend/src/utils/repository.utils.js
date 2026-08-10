export const extractRepositoryDetails = ({ repositoryLink }) => {
  const url = new URL(repositoryLink);
  const parts = url.pathname.split("/").filter(Boolean);

  const owner = parts[0];
  const repositoryName = parts[1].replace(/\.git$/, "");

  return { owner, repositoryName };
};
