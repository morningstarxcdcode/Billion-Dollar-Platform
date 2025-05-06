import { Request, Response, NextFunction } from 'express';
import { httpRequestDurationMicroseconds, httpRequestsTotal } from '../services/monitoring';

export const monitoringMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    
    httpRequestDurationMicroseconds
      .labels(req.method, req.path, res.statusCode.toString())
      .observe(duration / 1000); // Convert to seconds
    
    httpRequestsTotal
      .labels(req.method, req.path, res.statusCode.toString())
      .inc();
  });

  next();
};