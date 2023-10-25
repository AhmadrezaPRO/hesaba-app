import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '../../components'
import { CustomInputProps } from '../../types'

export const CustomSelect = ({ name, label, options, ...props }: CustomInputProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext()

	const error = errors[name]?.message as string | undefined
	const id = `${name}-${props.type}-${label}`

	return (
		<div className="custom-select">
			<div className="custom-select__label">{label}</div>
			<div className="custom-select__container">
				<label htmlFor={id}></label>
				<select {...register(name)} {...props} id={id} className="custom-select__input">
					{/*<option value=''>--- Select option ---</option>*/}
					{options &&
						options.map(({ desc, value }) => (
							<option key={value} value={value} className="custom-select__option">
								{desc}
							</option>
						))}
				</select>
			</div>
			<ErrorMessage error={error} />
		</div>
	)
}
