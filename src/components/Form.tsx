import {yupResolver} from '@hookform/resolvers/yup'
import {FormProvider, useForm} from 'react-hook-form'
import {CustomCheckbox, CustomInput, CustomRadio, CustomSelect} from '../components'
import {InputProps, SchemaForm} from '../types'

interface Props {
    onSubmit: (data: unknown) => void
    labelButtonSubmit?: string
    titleForm?: string

    initialValues: unknown
    validationSchema: SchemaForm
    inputs: InputProps[]
}

export const Form = ({...props}: Props) => {
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
        defaultValues: {...(initialValues as any)}
    })

    const createInputs = () =>
        inputs.map(({validations, typeValue, value, ...inputProps}) => {
            switch (inputProps.type) {
                case 'select':
                    return <CustomSelect {...inputProps} key={inputProps.name}/>
                case 'checkbox':
                    return <CustomCheckbox {...inputProps} key={inputProps.name}/>
                case 'radio':
                    return <CustomRadio {...inputProps} key={inputProps.name}/>
                case 'circle':
                    return <section className="circle-button-container">
                        <button className="circle-button">
                            <svg
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 16H13.5L13.5 10H15.5L15.5 16H17L14.5 19L12 16Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M8 8H9.5L9.5 14H11.5L11.5 8H13L10.5 5L8 8Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                        <p>1 = {100}</p>
                    </section>
                default:
                    return <CustomInput {...inputProps} key={inputProps.name}/>
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

                <div>
                    <p>Current Source Wallet: {100}</p>
                </div>
                <section className="form__section">{createInputs()}</section>
                <div>
                    <p>Current Destination Wallet: {0}</p>
                </div>
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
