import { Request } from 'express';
import { UserRole } from '@prisma/client';

export interface AuthUser {
  userId: string;
  email: string;
  hospitalId: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
  hospitalId?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
  errors?: any;
}
