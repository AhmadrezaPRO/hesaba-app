import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '../../components'
import { CustomInputProps } from '../../types'

export const CustomRadio = ({ name, label, options, checked, ...props }: CustomInputProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext()

	const error = errors[name]?.message as string | undefined

	return (
		<div className="custom-radio">
			<div className="custom-radio__label">
				<label>{label}</label>
				<section className="custom-radio__options">
					{options &&
						options.map(({ desc, value }) => (
							<label
								key={value}
								className={`custom-radio__option ${checked === value ? 'custom-radio__option--hover' : ''}`}
							>
								<input {...register(name)} {...props} value={value} type='radio' />
								{desc}
							</label>
						))}
				</section>
			</div>
			<ErrorMessage error={error} />
		</div>
	)
}
