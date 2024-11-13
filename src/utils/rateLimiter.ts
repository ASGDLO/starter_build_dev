type RateLimitRecord = {
  count: number;
  lastRequest: number;
  blockedUntil: number;
};

const rateLimitStore: Record<string, RateLimitRecord> = {};

export const rateLimiter = (ip: string, limit: number, windowMs: number, blockMs: number): boolean => {
  const now = Date.now();
  const record = rateLimitStore[ip] || { count: 0, lastRequest: 0, blockedUntil: 0 };

  if (record.blockedUntil > now) {
    return false; // Block the request
  }

  if (record.lastRequest + windowMs < now) {
    record.count = 1; // Reset count if outside the window
  } else {
    record.count += 1;
  }

  record.lastRequest = now;

  if (record.count > limit) {
    record.blockedUntil = now + blockMs;
    rateLimitStore[ip] = record;
    return false; // Block the request
  }

  rateLimitStore[ip] = record;
  return true; // Allow the request
};