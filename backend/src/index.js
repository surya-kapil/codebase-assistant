import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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
  const { owner } = req.body;
  await new Promise(resolve => setTimeout(resolve, 2000));
  res.json({ welcomeMessage: `This server welcomes ${owner}` });
});

app.listen(BACKEND_PORT, () => {
  console.log(`Server listening on ${BACKEND_PORT}`);
  console.log(`Accepting responses from ${FRONTEND_PATH}`);
});
