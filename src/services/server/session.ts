import { SESSION_SECRET } from 'astro:env/server';
import { createHmac, timingSafeEqual } from 'node:crypto';

const MAX_AGE = 60 * 60 * 24 * 30;

const sign = (payload: string) =>
	createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');

export function createToken() {
	const payload = String(Math.floor(Date.now() / 1000) + MAX_AGE);
	return `${payload}.${sign(payload)}`;
}

export function verifyToken(token?: string) {
	if (!token) return false;
	const [payload, sig] = token.split('.');
	if (!payload || !sig) return false;
	const a = Buffer.from(sig);
	const b = Buffer.from(sign(payload));
	if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
	return Number(payload) > Date.now() / 1000;
}

export const cookieOptions = {
	path: '/',
	httpOnly: true,
	sameSite: 'lax' as const,
	secure: import.meta.env.PROD, // Astro doesn't add this for you
	maxAge: MAX_AGE,
};
