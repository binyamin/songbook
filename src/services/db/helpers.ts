import { regex, type ErrorMessage } from 'valibot';

export function _nanoid(message: ErrorMessage = 'Invalid NanoID') {
	return regex(/^[a-z0-9_\-]{21}$/ui, message);
}
