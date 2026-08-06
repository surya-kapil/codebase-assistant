import simpleGit from "simple-git";

export const cloneRepository = async ({ repositoryLink }) => {
  const git = simpleGit();

  const repoName = repositoryLink.split("/").pop().replace(".git", "");
  await git.clone(repositoryLink, `clonedRepositories/${repoName}`);
};
