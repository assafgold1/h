import { next } from '@vercel/edge';
import { inject } from '@vercel/analytics';
 
inject();

import { injectSpeedInsights } from '@vercel/speed-insights';
 
injectSpeedInsights();

export default function middleware(req) {
  return next({
    headers: {
      'Referrer-Policy': 'origin-when-cross-origin',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-DNS-Prefetch-Control': 'on',
      "host":"localhost:8081",
      'Strict-Transport-Security':
          'max-age=31536000; includeSubDomains; preload',
    },
  });
}

