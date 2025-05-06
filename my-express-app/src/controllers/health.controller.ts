import { Request, Response } from 'express';
import mongoose from 'mongoose';
import os from 'os';

export class HealthController {
  async check(req: Request, res: Response) {
    const healthcheck = {
      uptime: process.uptime(),
      timestamp: Date.now(),
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage(),
      systemMemory: {
        total: os.totalmem(),
        free: os.freemem()
      },
      mongoStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    };

    try {
      res.json(healthcheck);
    } catch (error) {
      res.status(503).json({ error: 'Service unavailable' });
    }
  }

  async ping(req: Request, res: Response) {
    res.status(200).json({ status: 'ok' });
  }
}