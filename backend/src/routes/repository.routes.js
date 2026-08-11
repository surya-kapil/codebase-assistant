import Router from "express";
import ROUTES from "./routes.js";
import {
  createRepository,
  queryRepository,
} from "../controllers/repo.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route(ROUTES.REPOSITORY.CLONE).post(verifyJWT, createRepository);
router.route(ROUTES.REPOSITORY.QUERY).post(verifyJWT, queryRepository);

export default router;
