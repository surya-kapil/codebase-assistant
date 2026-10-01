import { addFile } from "../clients/bullMQ.client.js";
import { generate, generateEmbeddings } from "../clients/ollama.client.js";
import {
  addRepositoryToWorkspace,
  checkWorkspace,
  fetchWorkspaceRepositories,
  findRelevantChunks,
  getOrCreateRepository,
} from "../services/repository.services.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { codeAssistantPrompt } from "../utils/prompts.utils.js";

export const queryRepository = asyncHandler(async (req, res) => {
  const { query, repositoryId } = req.body;
  const { id: userId } = req.user;

  if (!query || !repositoryId) {
    throw new ApiError(
      401,
      "Missing query or repositoryId",
      "INCOMPLETE_FIELDS"
    );
  }

  const isRepositoryInWorkspace = await checkWorkspace({
    userId,
    repositoryId,
  });

  if (!isRepositoryInWorkspace) {
    throw new ApiError(404, "Repository Not Found", "REPOSITORY_NOT_FOUND");
  }

  const embeddedQuery = await generateEmbeddings(query);

  const chunks = await findRelevantChunks({
    embeddedQuery,
    repositoryId,
  });

  const prompt = codeAssistantPrompt({ chunks, query });

  const response = await generate(prompt);

  res.json(new ApiResponse(200, { response }, "Query Successful"));
});

export const fetchRepository = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;

  const repositories = await fetchWorkspaceRepositories({ userId });
  const transformedRepositories = repositories.map(repoObject => {
    return { id: repoObject.repository.id, name: repoObject.repository.name };
  });

  res.send(
    new ApiResponse(
      200,
      { repositories: transformedRepositories },
      "Fetched Repositories"
    )
  );
});

export const createRepository = asyncHandler(async (req, res) => {
  const { repositoryLink } = req.body;
  const { id: userId } = req.user;

  let repositoryId, isNew;
  try {
    const response = await getOrCreateRepository({
      repositoryLink,
    });
    repositoryId = response.repositoryId;
    isNew = response.isNew;
  } catch {
    throw new ApiError(404, "Repository Not Found", "REPOSITORY_NOT_FOUND");
  }

  await addRepositoryToWorkspace({ userId, repositoryId });

  if (!isNew) {
    res.json(
      new ApiResponse(
        200,
        { repositoryId },
        "Repository Added",
        "REPOSITORY_QUEUED"
      )
    );
    return;
  }

  await addFile({ repositoryId, repositoryLink });

  res
    .status(202)
    .json(
      new ApiResponse(
        202,
        null,
        "Repository indexing task queued",
        "REPOSITORY_QUEUED"
      )
    );
});
