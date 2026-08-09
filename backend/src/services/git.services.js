import simpleGit from "simple-git";
import { REPOSITORIES } from "../constants/repository.constants.js";
import { randomUUID } from "crypto";
import path from "path";

export const cloneRepository = async ({ repositoryLink }) => {
  const git = simpleGit();
  const repoPath = path.join(REPOSITORIES.DEFAULT_PATH, randomUUID());

  await git.clone(repositoryLink, repoPath);
  return repoPath;
};
