import { Button } from '../../components/elements/button'

export const documentProps ={
	title: 'Account',
}

export function Page() {
	return <article class='document | flow'>
		<h1>Account</h1>

		<p>You are logged-in.</p>

		<form action="/auth/logout" method='POST'>
			<Button variant='solid' type="submit">Log out</Button>
		</form>
	</article>
}
