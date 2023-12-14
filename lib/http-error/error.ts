import { ErrorStatus, isClientErrorStatus, STATUS_CODE, STATUS_TEXT } from './status.ts';

export interface HttpErrorOptions extends ErrorOptions {
	expose?: boolean;
	data?: Dict<unknown>;
	headers?: HeadersInit;
}

/**
 * The base class that all derivative HTTP extend, providing a `status` and an
 * `expose` property.
 */
export class HttpError extends Error {
	#status: ErrorStatus = STATUS_CODE.InternalServerError;
	#expose: boolean;
	#headers?: Headers;
	#data?: Dict<unknown>;

	constructor(
		status: ErrorStatus = STATUS_CODE.InternalServerError,
		message?: string,
		options?: HttpErrorOptions,
	) {
		message ??= STATUS_TEXT[status];
		super(message, options);
		this.#status = status;

		this.#expose = options?.expose === undefined
			? isClientErrorStatus(this.status)
			: options.expose;

		if (options?.headers) {
			this.#headers = new Headers(options.headers);
		}

		if (options?.data) {
			this.#data = options.data;
		}
	}

	/**
	 * A flag to indicate if the internals of the error, like the stack, should
	 * be exposed to a client, or if they are "private" and should not be leaked.
	 * By default, all client errors are `true` and all server errors are
	 * `false`.
	 */
	get expose(): boolean {
		return this.#expose;
	}

	/** The optional headers object that is set on the error. */
	get headers(): Headers | undefined {
		return this.#headers;
	}

	/** The error status that is set on the error. */
	get status(): ErrorStatus {
		return this.#status;
	}

	get data(): Dict<unknown> | undefined {
		return this.#data;
	}
}
