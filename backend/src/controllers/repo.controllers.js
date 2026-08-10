import {
  addRepositoryToWorkspace,
  cloneRepository,
  getOrCreateRepository,
  indexRepository,
} from "../services/repository.services.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { extractChunks } from "../utils/files.utils.js";

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
