import bcrypt from 'bcryptjs';
import { prisma } from '../database/client';
import { generateTokens } from '../utils/jwt';
import { AuthUser } from '../types';

export class AuthService {
  static async login(email: string, pass: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true, hospital: true },
    });

    if (!user || !user.isActive) {
      throw { statusCode: 401, message: 'Invalid credentials or inactive account.' };
    }

    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (!isMatch) {
      throw { statusCode: 401, message: 'Invalid credentials.' };
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const authUser: AuthUser = {
      userId: user.id,
      email: user.email,
      hospitalId: user.hospitalId,
      role: user.role.name,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const tokens = generateTokens(authUser);

    return {
      user: authUser,
      hospital: {
        id: user.hospital.id,
        name: user.hospital.name,
        code: user.hospital.code,
      },
      tokens,
    };
  }

  static async me(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true, hospital: true, doctor: true, patient: true },
    });

    if (!user) {
      throw { statusCode: 404, message: 'User not found.' };
    }

    return {
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role.name,
      hospital: user.hospital,
      doctorProfile: user.doctor,
      patientProfile: user.patient,
    };
  }
}
