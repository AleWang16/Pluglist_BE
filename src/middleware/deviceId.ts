import { Request, Response, NextFunction } from 'express';

const deviceMap = new Map<string, { count: number; lastRequest: number }>();
const MAX_REQUESTS = 20;
const WINDOW_MS = 60 * 1000;

export const deviceRateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const deviceId = req.deviceId || req.cookies['device-id'];

  if (!deviceId) {
    return res.status(400).json({ error: 'Device ID missing' });
  }

  const now = Date.now();
  const record = deviceMap.get(deviceId);

  if (!record || now - record.lastRequest > WINDOW_MS) {
    deviceMap.set(deviceId, { count: 1, lastRequest: now });
    return next();
  }

  record.count += 1;
  record.lastRequest = now;

  if (record.count > MAX_REQUESTS) {
    return res.status(429).json({ error: 'Too many requests from this device.' });
  }

  next();
};