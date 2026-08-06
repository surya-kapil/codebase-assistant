import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { cloneRepository } from "./services/git.services.js";

dotenv.config();

const FRONTEND_PATH = process.env.FRONTEND_PATH;
const BACKEND_PORT = process.env.BACKEND_PORT;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [FRONTEND_PATH],
  })
);

app.post("/", async (req, res) => {
  const { owner: repositoryLink } = req.body;
  await cloneRepository({ repositoryLink });
  res.json({ welcomeMessage: `Cloned Repo` });
});

app.listen(BACKEND_PORT, () => {
  console.log(`Server listening on ${BACKEND_PORT}`);
  console.log(`Accepting responses from ${FRONTEND_PATH}`);
});
