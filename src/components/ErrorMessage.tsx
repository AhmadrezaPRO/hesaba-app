interface Props {
	error?: string
}

export const ErrorMessage = ({ error }: Props) => {
	if (!error) return null

	return (
		<div className="error-message">
			<p className="error-message__text">{error}</p>
		</div>
	)
}
