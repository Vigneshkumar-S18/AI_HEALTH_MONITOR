import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AuthUser } from '../types';

export const generateTokens = (user: AuthUser) => {
  const accessToken = jwt.sign(
    {
      userId: user.userId,
      email: user.email,
      hospitalId: user.hospitalId,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn as any }
  );

  const refreshToken = jwt.sign(
    { userId: user.userId, hospitalId: user.hospitalId },
    config.jwt.refreshSecret,
    { expiresIn: config.jwt.refreshExpiresIn as any }
  );

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string): AuthUser | null => {
  try {
    return jwt.verify(token, config.jwt.secret) as AuthUser;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token: string): { userId: string; hospitalId: string } | null => {
  try {
    return jwt.verify(token, config.jwt.refreshSecret) as any;
  } catch (error) {
    return null;
  }
};
