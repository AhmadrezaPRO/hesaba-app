import {yupResolver} from '@hookform/resolvers/yup'
import {FormProvider, useForm} from 'react-hook-form'
import {CustomCheckbox, CustomInput, CustomRadio, CustomSelect} from '../components'
import {InputProps, SchemaForm} from '../types'
import {exchangeArray} from "../lib";
import {useEffect, useMemo} from "react";
import {useQuery} from "react-query";
import {useSelector} from "react-redux";
import {ErrorMessage} from "./ErrorMessage";

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

    // const { usd, eur, gbp } = useSelector((state) => state.wallet);
    const wallet = useSelector((state) => state.wallet);
    // console.log(usd)

    const formMethods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {...(initialValues as any)}
    })

    // const sourceSymbol = formMethods.getValues("source")
    const watchSource = formMethods.watch('source')
    const watchDest = formMethods.watch('dest')
    const watchInput= formMethods.watch('inputAmount')

    // console.log(!watchInput)

    const {data} = useQuery({
        queryKey: ['fetchExchange', watchSource],
        queryFn: () => fetchExchange(watchSource),
        enabled: !!watchSource,
        refetchInterval: 5000
    });

    console.log(data)

    const convertedData = data?.conversion_rates[watchDest.toUpperCase()]

    useEffect(()=>{
        if (!!watchInput){
            formMethods.setValue('outputAmount', watchInput*convertedData)
        }
    }, [watchInput, convertedData])

    const fetchExchange = async (currency) => {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/711fbda37723e456740c14ca/latest/${currency}`);
        console.log(res)
        return res.json();
    };

    // console.log(watchSource)
    const sourceSymbol = useMemo(() => {
        if (watchSource)
            return exchangeArray.find(element => element.value === watchSource).symbol
    }, [watchSource])
    const destSymbol = useMemo(() => {
        if (watchSource)
            return exchangeArray.find(element => element.value === watchDest).symbol
    }, [watchDest])

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
                    return <section
                        key={inputProps.name}
                        className="circle-button-container"
                    >
                        <button
                            type="button"
                            className="circle-button"
                            onClick={() => formMethods.reset((prev) => ({
                                ...prev,
                                source: watchDest,
                                dest: watchSource
                            }))}
                        >
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
                        <p>{sourceSymbol}1 = {convertedData}{destSymbol}</p>
                    </section>
                default:
                    return <CustomInput {...inputProps} key={inputProps.name}/>
            }
        })

    return (
        <FormProvider {...formMethods}>
            <form
                noValidate
                onSubmit={formMethods.handleSubmit(onSubmit)}
                className="form"
            >
                {titleForm && (
                    <h5 className="form__title">
                        {titleForm}
                    </h5>
                )}

                <div>
                    <p>Source Wallet: {wallet[watchSource]}{sourceSymbol}</p>
                </div>
                <section className="form__section">{createInputs()}</section>
                <div>
                    <p>Destination Wallet: {wallet[watchDest]}{destSymbol}</p>
                </div>
                <button
                    className="form__button"
                    type="submit"
                    // disabled={!watchInput || !data || wallet[watchSource] < watchInput}
                    // disabled={!data && !watchInput}
                >
                    {labelButtonSubmit}
                </button>
                {wallet[watchSource] < watchInput && <ErrorMessage error={"Input is higher than current wallet money!"} className="custom-input__error" />}
            </form>
        </FormProvider>
    );
}
