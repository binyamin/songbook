export function Layout(props: preact.RenderableProps<{}>) {
	return <div id='root' class='app | l-gelati | flow'>
		<nav class='l-repel'>
			<a href="/">Home</a>
			<ul role="list" class='l-cluster'>
				<li><a href="/songs">Songs</a></li>
			</ul>
		</nav>
		<main>{props.children}</main>
		<footer class='l-center'>
			<p>Made by Binyamin Green</p>
		</footer>
	</div>
}
