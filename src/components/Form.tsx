import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { CustomCheckbox, CustomInput, CustomRadio, CustomSelect } from '../components'
import { InputProps, SchemaForm } from '../types'

interface Props {
	onSubmit: (data: unknown) => void
	labelButtonSubmit?: string
	titleForm?: string

	initialValues: unknown
	validationSchema: SchemaForm
	inputs: InputProps[]
}

export const Form = ({ ...props }: Props) => {
	const {
		initialValues,
		inputs,
		onSubmit,
		validationSchema,
		titleForm,
		labelButtonSubmit = 'Submit'
	} = props

	const formMethods = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: { ...(initialValues as any) }
	})

	const createInputs = () =>
		inputs.map(({ validations, typeValue, value, ...inputProps }) => {
			switch (inputProps.type) {
				case 'select':
					return <CustomSelect {...inputProps} key={inputProps.name} />
				case 'checkbox':
					return <CustomCheckbox {...inputProps} key={inputProps.name} />
				case 'radio':
					return <CustomRadio {...inputProps} key={inputProps.name} />
				default:
					return <CustomInput {...inputProps} key={inputProps.name} />
			}
		})

	return (
		<FormProvider {...formMethods}>
			<form
				onSubmit={formMethods.handleSubmit(onSubmit)}
				className="form"
			>
				{titleForm && (
					<h5 className="form__title">
						{titleForm}
					</h5>
				)}

				<section className="form__section">{createInputs()}</section>

				<button
					className="form__button"
					type="submit"
				>
					{labelButtonSubmit}
				</button>
			</form>
		</FormProvider>
	);
}
