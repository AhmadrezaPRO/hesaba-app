import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '../../components'
import { CustomInputProps } from '../../types'

export const CustomInput = ({ name, label, ...props }: CustomInputProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext()

	const error = errors[name]?.message as string | undefined

	const id = `${name}-${props.type}-${label}`

	return (
		<div className="custom-input">
			{label && (
				<label className="custom-input__label" htmlFor={id}>
					{label}
				</label>
			)}

			<input
				className="custom-input__field"
				{...register(name)}
				{...props}
				id={id}
			/>

			<ErrorMessage error={error} className="custom-input__error" />
		</div>
	)
}
