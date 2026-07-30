import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { sendResponse } from '../utils/response';

export const enforceTenantScope = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const headerTenant = req.headers['x-hospital-id'] as string;

  if (req.user?.hospitalId) {
    if (headerTenant && headerTenant !== req.user.hospitalId && req.user.role !== 'ADMIN') {
      return sendResponse(res, 403, false, 'Cross-tenant access violation restricted.');
    }
    req.hospitalId = req.user.hospitalId;
  } else if (headerTenant) {
    req.hospitalId = headerTenant;
  }

  if (!req.hospitalId) {
    return sendResponse(res, 400, false, 'Hospital tenant identification missing in request scope.');
  }

  next();
};
