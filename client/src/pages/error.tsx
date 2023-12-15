import type { ErrorStatus } from '../../../lib/http-error/status.ts';

interface Props {
	error: {
		code: ErrorStatus,
		name: string,
		message?: string,
	}
}

export const documentProps = {
	title: 'Error',
}

export function Page(props: Props) {
	return <article class='document | flow'>
		<h1>Error: <var>{props.error.name}</var></h1>
		<p>The server responded with the code <var>{props.error.code}</var></p>
		<label for="message" style={{
			'font-weight': 600,
			display: 'block',
		}}>Message</label>
		<output>{props.error.message ?? 'No Message was provided'}</output>
	</article>
}
