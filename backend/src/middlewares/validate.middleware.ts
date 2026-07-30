import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { sendResponse } from '../utils/response';

export const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issueDetails = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return sendResponse(res, 400, false, 'Validation failed for request payload', undefined, undefined, issueDetails);
      }
      next(error);
    }
  };
};
