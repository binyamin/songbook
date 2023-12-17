export const documentProps ={
	title: 'Log in',
}

export function Page() {
	return <article class='document | flow'>
		<h1>Log in</h1>

		<form action='/auth/login' method='post'>
			<div>
				<label for="form-email">Email</label>
				<input type="email" autocomplete='email' name="email" id="form-email" required />
			</div>
			<div>
				<label for="form-password">Password</label>
				<input type="password" name="password" id="form-password" required minlength={8} autocomplete='current-password' />
			</div>
			<button type="submit">Log in</button>
		</form>
	</article>
}
