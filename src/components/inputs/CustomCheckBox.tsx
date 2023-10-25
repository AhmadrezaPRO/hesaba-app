import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '../../components'
import { CustomInputProps } from '../../types'

export const CustomCheckbox = ({ name, label, ...props }: CustomInputProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext()

	const error = errors[name]?.message as string | undefined

	return (
		<div className="custom-checkbox">
			<label className="custom-checkbox__label">
				<input {...props} {...register(name)} className="custom-checkbox__input" />
				{label}
			</label>

			<ErrorMessage error={error} className="custom-checkbox__error" />
		</div>
	);
}
