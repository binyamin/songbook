import { type ErrorMessage, regex, type RegexIssue } from 'valibot';

export function musical_key(
	message: ErrorMessage<RegexIssue<string>> = 'Invalid key signature',
) {
	return regex(/^[A-G][b#]?m?$/u, message);
}
