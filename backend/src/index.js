import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import repositoryRoutes from "./routes/repository.routes.js";
import errorHandler from "./middlewares/errorHandler.middlewares.js";
import cookieParser from "cookie-parser";

dotenv.config();

const FRONTEND_PATH = process.env.FRONTEND_PATH;
const BACKEND_PORT = process.env.BACKEND_PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [FRONTEND_PATH],
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/repository", repositoryRoutes);

app.use(errorHandler);

app.listen(BACKEND_PORT, () => {
  console.log(`Server listening on ${BACKEND_PORT}`);
  console.log(`Accepting responses from ${FRONTEND_PATH}`);
});
