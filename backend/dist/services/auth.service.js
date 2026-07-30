"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("../database/client");
const jwt_1 = require("../utils/jwt");
class AuthService {
    static async login(email, pass) {
        const user = await client_1.prisma.user.findUnique({
            where: { email },
            include: { role: true, hospital: true },
        });
        if (!user || !user.isActive) {
            throw { statusCode: 401, message: 'Invalid credentials or inactive account.' };
        }
        const isMatch = await bcryptjs_1.default.compare(pass, user.passwordHash);
        if (!isMatch) {
            throw { statusCode: 401, message: 'Invalid credentials.' };
        }
        // Update last login
        await client_1.prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() },
        });
        const authUser = {
            userId: user.id,
            email: user.email,
            hospitalId: user.hospitalId,
            role: user.role.name,
            firstName: user.firstName,
            lastName: user.lastName,
        };
        const tokens = (0, jwt_1.generateTokens)(authUser);
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
    static async me(userId) {
        const user = await client_1.prisma.user.findUnique({
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
exports.AuthService = AuthService;
