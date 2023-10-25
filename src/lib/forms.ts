import { FormSection, InputProps } from '../types';



export const forms: { [K in FormSection]: InputProps[] } =
{
    exchange: [
        {
            type: "select",
            name: "rol",
            label: "From: ",
            value: "",
            options: [
                {
                    value: "usd",
                    desc: "USD",
                },
                {
                    value: "eur",
                    desc: "EUR"
                },
                {
                    value: "gbp",
                    desc: "GBP"
                }
            ],
            validations: [
                {
                    type: "required",
                    message: "Rol is required"
                }
            ]
        },
        {
            label: "Input Amount: ",
            type: "number",
            name: "username",
            placeholder: "Enter Amount for Exchange...",
            value: "",
            validations: [
                {
                    type: "minLength",
                    value: 3,
                    message: "Min. 3 characters",
                },
                {
                    type: "required",
                    message: "Username is required"
                },
            ],

        },
        {
            type: "select",
            name: "rol",
            label: "To: ",
            value: "",
            options: [
                {
                    value: "usd",
                    desc: "USD",
                },
                {
                    value: "eur",
                    desc: "EUR"
                },
                {
                    value: "gbp",
                    desc: "GBP"
                }
            ],
            validations: [
                {
                    type: "required",
                    message: "Rol is required"
                }
            ]
        },
        {
            label: "Output Amount: ",
            type: "number",
            name: "username",
            disabled: true,
            value: "",
            validations: [
                {
                    type: "minLength",
                    value: 3,
                    message: "Min. 3 characters",
                },
                {
                    type: "required",
                    message: "Username is required"
                },
            ],

        },
    ]
}