import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

const generateAccessToken = userId => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const generateRefreshToken = userId => {
  return jwt.sign(
    {
      userId,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const hashPassword = async password =>
  bcrypt.hash(password, SALT_ROUNDS);

export const comparePassword = async (hashedPassword = "", plainPassword) =>
  bcrypt.compare(plainPassword, hashedPassword);

export const generateAccessAndRefreshToken = userId => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  return { accessToken, refreshToken };
};
