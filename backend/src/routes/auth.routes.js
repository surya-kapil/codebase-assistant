import { Router } from "express";
import ROUTES from "./routes.js";
import { login, register } from "../controllers/auth.controllers.js";

const router = Router();

router.route(ROUTES.AUTH.REGISTER).post(register);
router.route(ROUTES.AUTH.LOGIN).post(login);

export default router;
