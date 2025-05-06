import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info('Request processed', {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration,
      userAgent: req.get('user-agent'),
      ip: req.ip
    });
  });

  next();
};

export const authenticationMiddleware = (req, res, next) => {
    // Implement authentication logic here
    next();
};

export { loggingMiddleware as logger };