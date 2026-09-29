import { Queue, Worker } from "bullmq";
import { redis } from "./redis.client.js";
import {
  cloneRepository,
  indexRepository,
} from "../services/repository.services.js";
import { extractChunks } from "../utils/files.utils.js";

const repositoryQueue = new Queue("repository", {
  connection: redis,
});

const repositoryWorker = new Worker(
  "repository",
  async job => {
    const { repositoryLink, repositoryId } = job.data;

    console.time("TOTAL");

    console.time("CLONE");
    const filePath = await cloneRepository({ repositoryLink });
    console.timeEnd("CLONE");

    console.time("CHUNK");
    const chunks = await extractChunks({ filePath });
    console.timeEnd("CHUNK");

    console.log("Chunks:", chunks.length);

    console.time("INDEX");
    await indexRepository({ chunks, repositoryId });
    console.timeEnd("INDEX");

    console.timeEnd("TOTAL");
  },
  {
    connection: redis,
    concurrency: 3,
  }
);

repositoryWorker.on("completed", job => {
  console.log(`Job ${job.id} completed`);
});

repositoryWorker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err);
});

export const addFile = async ({ repositoryLink, repositoryId }) => {
  await repositoryQueue.add(
    "process-file",
    { repositoryLink, repositoryId },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
    }
  );

  console.log("Job Submitted");
};
