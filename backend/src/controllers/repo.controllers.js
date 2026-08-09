import {
  LANGUAGE_BY_EXTENSION,
  LANGUAGE_CONFIG,
} from "../constants/repository.constants.js";
import { cloneRepository } from "../services/git.services.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import path from "path";

import {
  extractFiles,
  extractSemanticNodes,
  parseCode,
  readRepositoryFile,
} from "../utils/repository.utils.js";

export const createRepository = asyncHandler(async (req, res) => {
  const { repositoryLink } = req.body;
  const filePath = await cloneRepository({ repositoryLink });
  const files = await extractFiles(filePath);

  const extension = path.extname(files[0]);
  const language = LANGUAGE_BY_EXTENSION[extension];
  const config = LANGUAGE_CONFIG[language];

  const content = await readRepositoryFile(files[0]);
  const parsedContent = parseCode(content, language);
  //console.log(parsedContent);
  const node = parsedContent.rootNode;

  const chunks = extractSemanticNodes(node, config);
  console.log(chunks);

  res.json(new ApiResponse(200, { filePath }, "Fetched Path"));
});
