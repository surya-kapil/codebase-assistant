import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { prisma } from "../clients/prisma.client.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new ApiError(401, "Unauthorized Request");
  }

  let payload;

  try {
    payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch {
    throw new ApiError(401, "Jwt expired");
  }

  const { id } = payload;

  const user = await prisma.user.findFirst({
    where: { id },
    select: { id: true },
  });

  if (!user) {
    throw new ApiError(404, "User Not Found");
  }

  req.user = user;
  next();
});
