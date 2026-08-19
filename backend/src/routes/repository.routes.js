import Router from "express";
import ROUTES from "./routes.js";
import {
  createRepository,
  fetchRepository,
  queryRepository,
} from "../controllers/repo.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route(ROUTES.REPOSITORY.CLONE).post(createRepository);
router.route(ROUTES.REPOSITORY.QUERY).post(queryRepository);
router.route(ROUTES.REPOSITORY.FETCH).get(fetchRepository);

export default router;
