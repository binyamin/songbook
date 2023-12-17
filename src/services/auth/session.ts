import { TimeSpan } from 'oslo';
import { SessionController, SessionCookieController } from 'oslo/session';
import * as lib from '../db/session.ts';
import { HttpError } from '../../../lib/http-error/index.ts';

export type { Session } from '../db/session.ts';

const sessionController = new SessionController(new TimeSpan(30, 'd'));
const sessionCookieController = new SessionCookieController(
	'session',
	sessionController.expiresIn,
	{
		// set to false for developing in localhost
		secure: process.env.NODE_ENV === 'production',
	}
);

export async function createSession(userId: string) {
	const expirationDate = sessionController.createExpirationDate();
	const session = await lib.insert({
		userId,
		expiry: expirationDate,
	});

	const cookie = sessionCookieController.createSessionCookie(session.id);

	return cookie;
}

export async function verifySession(cookies: string) {
	const sessionId = sessionCookieController.parseCookies(cookies);
	if (!sessionId) return false;

	const session = await lib.find(sessionId);

	if (!session) {
		throw new HttpError(500, "Invalid session");
	}

	const sessionState = sessionController.getSessionState(session.expiry);
	if (sessionState === "expired") {
		await deleteSession(session.id);
		throw new HttpError(500, 'Expired Session');
	}

	// check if session expiration was updated
	if (sessionState === "idle") {
		await lib.update(session.id, {
			expiry: sessionController.createExpirationDate(),
			userId: session.userId,
		});
		const cookie = sessionCookieController.createSessionCookie(session.id);
		return {session, cookie};
	}

	// valid session
	return { session }
}

export async function deleteSession(cookies: string) {
	const sessionId = sessionCookieController.parseCookies(cookies);
	if (!sessionId) {
		throw new HttpError(500, "Invalid session");
	}

	const res = await lib.remove(sessionId);

	if (!res) {
		throw new HttpError(500, "Invalid session");
	}

	const cookie = sessionCookieController.createBlankSessionCookie();

	return cookie;
}
