import { type ErrorMessage, regex, type RegexIssue } from 'valibot';

export function _nanoid(
	message: ErrorMessage<RegexIssue<string>> = 'Invalid NanoID',
) {
	return regex(/^[a-z0-9_\-]{21}$/ui, message);
}

export function musical_key(
	message: ErrorMessage<RegexIssue<string>> = 'Invalid key signature',
) {
	return regex(/^[A-G][b#]?m?$/u, message);
}
