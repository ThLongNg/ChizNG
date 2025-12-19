// /api/views.js
// Serverless page view counter (Vercel).
// Requires Upstash Redis REST credentials for persistence.

import crypto from 'crypto';

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const IP_TTL_SECONDS = Number.parseInt(process.env.VIEWS_IP_TTL_SECONDS || '3600', 10);
const BLOCKED_COUNTRIES = (process.env.VIEWS_BLOCKED_COUNTRIES || '')
  .split(',')
  .map((value) => value.trim().toUpperCase())
  .filter(Boolean);

function getHeader(req, name) {
  const value = req.headers?.[name];
  if (Array.isArray(value)) return value[0] || '';
  return value || '';
}

function getClientIp(req) {
  const forwardedFor = getHeader(req, 'x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();

  const realIp = getHeader(req, 'x-real-ip');
  if (realIp) return realIp.trim();

  return req.socket?.remoteAddress || '';
}

function isLikelyBot(userAgent) {
  const ua = (userAgent || '').toLowerCase();
  return (
    ua.includes('bot') ||
    ua.includes('spider') ||
    ua.includes('crawler') ||
    ua.includes('headless') ||
    ua.includes('lighthouse') ||
    ua.includes('curl') ||
    ua.includes('wget')
  );
}

function hashIp(ip) {
  return crypto.createHash('sha256').update(ip).digest('hex');
}

async function upstashCommand(command) {
  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    throw new Error('Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN');
  }

  const response = await fetch(`${UPSTASH_REDIS_REST_URL}/command`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.error || data?.message || 'Upstash request failed';
    throw new Error(message);
  }
  return data;
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    return res.status(501).json({
      error: 'View counter is not configured',
      hint: 'Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in Vercel env vars.',
    });
  }

  const scopeRaw = (req.query?.scope || 'site').toString();
  const scope = scopeRaw.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 48) || 'site';

  const userAgent = getHeader(req, 'user-agent');
  const country = (getHeader(req, 'x-vercel-ip-country') || '').toUpperCase();

  const blockedByCountry = country && BLOCKED_COUNTRIES.includes(country);
  const blockedByBot = isLikelyBot(userAgent);

  const totalKey = `views:total`;
  const pageKey = `views:page:${scope}`;

  let counted = false;

  try {
    if (!blockedByCountry && !blockedByBot) {
      const ip = getClientIp(req);
      const ipHash = hashIp(ip || '');
      const ipKey = `views:seen:${scope}:${ipHash}`;

      // Deduplicate by IP within TTL.
      // SET key 1 NX EX <seconds>
      const setResult = await upstashCommand(['SET', ipKey, '1', 'NX', 'EX', `${Math.max(60, IP_TTL_SECONDS)}`]);
      counted = setResult?.result === 'OK';

      if (counted) {
        await upstashCommand(['INCR', totalKey]);
        await upstashCommand(['INCR', pageKey]);
      }
    }

    const totalResult = await upstashCommand(['GET', totalKey]);
    const total = Number.parseInt(totalResult?.result || '0', 10) || 0;

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ total, counted, scope, country: country || null });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
