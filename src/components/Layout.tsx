export const Layout = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
	return (
		<div className="layout">
			<h1 className="layout__title">
				<span>Practice Task</span>
				<span className="layout__author">{' - Ahmad Yoozbashi'}</span>
			</h1>

			<main className="layout layout--grid">
				{children}
			</main>
		</div>
	);
}
