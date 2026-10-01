import {
  comparePassword,
  generateAccessAndRefreshToken,
  hashPassword,
} from "../services/auth.services.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../clients/prisma.client.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, "Fill all the fields", "INCOMPLETE_FIELDS");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      passwordHash: hashedPassword,
    },
    select: {
      id: true,
    },
  });

  res.json(new ApiResponse(200, user.id, "User Registered", "USER_REGISTERED"));
});

export const login = asyncHandler(async (req, res) => {
  const { username = "", email = "", password } = req.body;

  if (!username && !email) {
    throw new ApiError(
      400,
      "Please enter username or email",
      "INCOMPLETE_FIELDS"
    );
  }

  if (!password) {
    throw new ApiError(400, "Please enter password", "INCOMPLETE_FIELDS");
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (!user) {
    throw new ApiError(404, "User Not Found", "USER_NOT_FOUND");
  }

  const isPasswordSame = await comparePassword(user?.passwordHash, password);
  if (!isPasswordSame) {
    throw new ApiError(401, "Wrong Password", "INCORRECT_PASSWORD");
  }

  const { accessToken, refreshToken } = generateAccessAndRefreshToken(user.id);
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      refreshToken,
    },
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { userId: user.id },
        "User successfully logged in",
        "LOGIN_SUCCESSFUL"
      )
    );
});

export const checkLogin = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;
  res.send(new ApiResponse(200, { userId }, "User is logged in"));
});

export const logout = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.send(
    new ApiResponse(
      200,
      { userId },
      "User successfully logged out",
      "LOGOUT_SUCCESSFUL"
    )
  );
});
