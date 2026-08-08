import { Router } from "express";
import ROUTES from "./routes.js";
import {
  createRepository,
  login,
  register,
} from "../controllers/auth.controllers.js";

const router = Router();

router.route(ROUTES.CLONE).post(createRepository);
router.route(ROUTES.AUTH.REGISTER).post(register);
router.route(ROUTES.AUTH.LOGIN).post(login);

export default router;
