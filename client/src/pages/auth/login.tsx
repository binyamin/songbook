import { Button } from '../../components/elements/button'

export const documentProps ={
	title: 'Log in',
}

export function Page() {
	return <article class='document | flow'>
		<h1>Log in</h1>

		<form action='/auth/login' method='post' class='flow'>
			<div class='form-field'>
				<label for="form-email">Email</label>
				<input class='input' type="email" autocomplete='email' name="email" id="form-email" required />
			</div>
			<div class='form-field'>
				<label for="form-password">Password</label>
				<input class='input' type="password" name="password" id="form-password" required minlength={8} autocomplete='current-password' />
			</div>
			<Button variant='solid' type="submit">Log in</Button>
		</form>
	</article>
}
