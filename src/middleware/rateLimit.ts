import { Request, Response, NextFunction } from 'express';

const ipRequestMap = new Map<string, { count: number; lastRequest: number }>();

const MAX_REQUESTS = 20;           // Max requests per window
const WINDOW_MS = 60 * 1000;       // 1 minute window

export const ipRateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const normalizedIP = Array.isArray(ip) ? ip[0] : ip?.toString()?.replace(/^::ffff:/, '') || '';

  const now = Date.now();
  const record = ipRequestMap.get(normalizedIP);

  if (!record || now - record.lastRequest > WINDOW_MS) {
    ipRequestMap.set(normalizedIP, { count: 1, lastRequest: now });
    return next();
  }

  record.count += 1;
  record.lastRequest = now;

  if (record.count > MAX_REQUESTS) {
    return res.status(429).json({ error: 'Too many requests from this IP. Try again later.' });
  }

  next();
};