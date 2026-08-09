import fs from "fs/promises";
import path from "path";
import {
  IGNORED_DIRECTORIES,
  SUPPORTED_EXTENSIONS,
  LANGUAGE_PARSERS,
} from "../constants/repository.constants.js";
import Parser from "tree-sitter";

export const extractFiles = async directory => {
  const entries = await fs.readdir(directory, {
    withFileTypes: true,
  });

  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (IGNORED_DIRECTORIES.has(entry.name)) {
        continue;
      }

      const nestedFiles = await extractFiles(fullPath);
      files.push(...nestedFiles);
      continue;
    }

    const extension = path.extname(entry.name);

    if (SUPPORTED_EXTENSIONS.has(extension)) {
      files.push(fullPath);
    }
  }

  return files;
};

export const readRepositoryFile = async filePath => {
  return await fs.readFile(filePath, "utf-8");
};

export const parseCode = (content, language) => {
  if (!language) {
    return null;
  }

  const parser = new Parser();

  parser.setLanguage(LANGUAGE_PARSERS[language]);

  return parser.parse(content);
};

export const extractSemanticNodes = (node, config, chunks = []) => {
  const isFunction = config.functionNodes.includes(node.type);
  const isClass = config.classNodes.includes(node.type);

  if (isFunction || isClass) {
    chunks.push({
      type: isFunction ? "function" : "class",
      name: config.getName(node),
      content: node.text,
      startLine: node.startPosition.row + 1,
      endLine: node.endPosition.row + 1,
    });

    return chunks;
  }

  for (const child of node.namedChildren) {
    extractSemanticNodes(child, config, chunks);
  }

  return chunks;
};
