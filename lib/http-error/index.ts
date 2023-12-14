export * from './error.ts';
export * as status from './status.ts';

import { STATUS_CODE } from './status.ts';
import { HttpError } from './error.ts';

export function fromError(error: Error): HttpError {
	if (error instanceof HttpError) return error;

	return new HttpError(STATUS_CODE.InternalServerError, error.message, {
		cause: error,
	});
}
