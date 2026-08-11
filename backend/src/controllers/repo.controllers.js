import { generate, generateEmbeddings } from "../clients/ollama.client.js";
import {
  addRepositoryToWorkspace,
  checkWorkspace,
  cloneRepository,
  findRelevantChunks,
  getOrCreateRepository,
  indexRepository,
} from "../services/repository.services.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { extractChunks } from "../utils/files.utils.js";
import { codeAssistantPrompt } from "../utils/prompts.utils.js";

export const createRepository = asyncHandler(async (req, res) => {
  const { repositoryLink } = req.body;
  const { id: userId } = req.user;

  const { repositoryId, isNew } = await getOrCreateRepository({
    repositoryLink,
  });

  await addRepositoryToWorkspace({ userId, repositoryId });

  if (!isNew) {
    res.json(new ApiResponse(200, { repositoryId }, "Done"));
    return;
  }

  const filePath = await cloneRepository({ repositoryLink });
  const chunks = await extractChunks({ filePath });

  await indexRepository({ chunks, repositoryId });

  res.json(new ApiResponse(201, { repositoryId }, "Repository Created"));
});

export const queryRepository = asyncHandler(async (req, res) => {
  const { query, repositoryId } = req.body;
  const { id: userId } = req.user;

  if (!query || !repositoryId) {
    throw new ApiError(401, "Missing query or repositoryId");
  }

  const isRepositoryInWorkspace = await checkWorkspace({
    userId,
    repositoryId,
  });

  if (!isRepositoryInWorkspace) {
    throw new ApiError(404, "Repository Not Found");
  }

  const embeddedQuery = await generateEmbeddings(query);

  const chunks = await findRelevantChunks({
    embeddedQuery,
    repositoryId,
  });

  const prompt = codeAssistantPrompt({ chunks, query });

  const response = await generate(prompt);

  res.json(new ApiResponse(200, { response }, "Well done"));
});
