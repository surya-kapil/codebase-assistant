import { Router } from "express";
import ROUTES from "./routes.js";
import {
  checkLogin,
  login,
  logout,
  register,
} from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route(ROUTES.AUTH.REGISTER).post(register);
router.route(ROUTES.AUTH.LOGIN).post(login);
router.route(ROUTES.AUTH.ME).post(verifyJWT, checkLogin);
router.route(ROUTES.AUTH.LOGOUT).post(verifyJWT, logout);

export default router;
