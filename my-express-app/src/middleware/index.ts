import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

export { logger };

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.debug('Authentication middleware called');
  // Your middleware logic here
  next();
};
