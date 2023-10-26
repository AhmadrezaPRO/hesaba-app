import { FormSection, InputProps } from '../types';

export const exchangeArray= [
    {
        value: "usd",
        desc: "USD",
        symbol: '$'
    },
    {
        value: "eur",
        desc: "EUR",
        symbol: '€'
    },
    {
        value: "gbp",
        desc: "GBP",
        symbol: '£'
    }
]

export const forms: { [K in FormSection]: InputProps[] } =
{
    exchange: [
        {
            type: "select",
            name: "source",
            label: "From: ",
            value: "usd",
            options: exchangeArray,
            validations: [
                {
                    type: "required",
                    message: "Source Currency is required"
                }
            ]
        },
        {
            label: "Input Amount: ",
            type: "number",
            name: "inputAmount",
            placeholder: "Enter Amount for Exchange...",
            value: "",
            validations: [
                {
                    type: "required",
                    message: "Input Amount is required"
                },
            ],

        },
        {
            type: "circle",
            name: "circle"
        },
        {
            type: "select",
            name: "dest",
            label: "To: ",
            value: "eur",
            options: exchangeArray,
            validations: [
                {
                    type: "required",
                    message: "Destination Currency is required"
                }
            ]
        },
        {
            label: "Output Amount: ",
            type: "number",
            name: "outputAmount",
            disabled: true,
            value: "",
            // validations: [
            //     {
            //         type: "minLength",
            //         value: 3,
            //         message: "Min. 3 characters",
            //     },
            //     {
            //         type: "required",
            //         message: "Username is required"
            //     },
            // ],

        },
    ]
}