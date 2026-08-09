import Router from "express";
import ROUTES from "./routes.js";
import { createRepository } from "../controllers/repo.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route(ROUTES.REPOSITORY.CLONE).post(verifyJWT, createRepository);

export default router;
