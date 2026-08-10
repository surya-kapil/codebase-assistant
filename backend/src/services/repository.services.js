import simpleGit from "simple-git";
import { REPOSITORIES } from "../constants/repository.constants.js";
import { randomUUID } from "crypto";
import path from "path";
import { fetchRepositoryDetails } from "../clients/github.client.js";
import { prisma } from "../clients/prisma.client.js";
import { generateEmbeddings } from "../clients/ollama.client.js";

export const cloneRepository = async ({ repositoryLink }) => {
  const git = simpleGit();
  const repoPath = path.join(REPOSITORIES.DEFAULT_PATH, randomUUID());

  await git.clone(repositoryLink, repoPath);
  return repoPath;
};

const addRepositoryToDatabase = async ({ repositoryLink }) => {
  const { repositoryName, default_branch } = await fetchRepositoryDetails({
    repositoryLink,
  });
  const { id } = await prisma.repository.create({
    data: {
      name: repositoryName,
      url: repositoryLink,
      defaultBranch: default_branch,
    },
    select: {
      id: true,
    },
  });

  return { id };
};

const repositoryExists = async ({ repositoryLink }) => {
  const data = await prisma.repository.findFirst({
    where: {
      url: repositoryLink,
    },
    select: {
      id: true,
    },
  });

  if (!data) {
    return { id: null };
  }

  return { id: data.id };
};

const addRepositoryChunk = async ({
  repositoryId,
  filePath,
  chunkIndex,
  content,
  embedding,
  startLine,
  endLine,
}) => {
  const vector = `[${embedding.join(",")}]`;
  const id = randomUUID();

  await prisma.$executeRaw`
    INSERT INTO "RepositoryChunk"
      ("id", "repositoryId", "filePath", "chunkIndex", "content",
       "embedding", "startLine", "endLine")
    VALUES (
      ${id},
      ${repositoryId},
      ${filePath},
      ${chunkIndex},
      ${content},
      ${vector}::vector,
      ${startLine},
      ${endLine}
    )
  `;
};

export const getOrCreateRepository = async ({ repositoryLink }) => {
  const repository = await repositoryExists({ repositoryLink });

  let repositoryId = repository?.id;
  let isNew = false;

  if (!repositoryId) {
    isNew = true;
    const newRepository = await addRepositoryToDatabase({ repositoryLink });
    repositoryId = newRepository.id;
  }

  return { repositoryId, isNew };
};

export const addRepositoryToWorkspace = async ({ userId, repositoryId }) => {
  const response = await prisma.workspaceRepository.findFirst({
    where: {
      userId,
      repositoryId,
    },
    select: {
      id: true,
    },
  });

  if (response) {
    return;
  }

  await prisma.workspaceRepository.create({
    data: {
      userId,
      repositoryId,
    },
  });
};

export const indexRepository = async ({ chunks, repositoryId }) => {
  const contentArray = chunks.map(chunk => chunk.content);

  const embeddings = await generateEmbeddings(contentArray);

  await Promise.all([
    chunks.map((chunk, index) => {
      addRepositoryChunk({
        repositoryId,
        filePath: chunk.filePath,
        chunkIndex: index,
        content: chunk.content,
        embedding: embeddings[index],
        startLine: chunk.startLine,
        endLine: chunk.endLine,
      });
    }),
  ]);
};
