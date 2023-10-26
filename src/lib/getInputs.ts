import * as Yup from "yup";
import {AnyObject} from "yup/lib/types";
import {FormSection, InputProps} from '../types';
import {forms} from '../lib';

type YupBoolean = Yup.BooleanSchema<boolean | undefined, AnyObject, boolean | undefined>
type YupString = Yup.StringSchema<string | undefined, AnyObject, string | undefined>
type YupNumber = Yup.NumberSchema<number | undefined, AnyObject, number | undefined>

const generateValidations = (field: InputProps): YupBoolean | YupString | YupNumber | null => {

    if (!field.validations) return null

    let schema = Yup[field.typeValue || 'string']()

    for (const rule of field.validations) {
        switch (rule.type) {
            case 'minLength':
                schema = (schema as YupString).min(rule.value as number, rule.message);
                break;
            case 'oneOf':
                schema = (schema as YupString).oneOf([Yup.ref(rule.ref as string)], rule.message);
                break;
            case 'twoDecimalPlaces':
                schema = (schema as YupString).test('two-decimal-places', rule.message, (value) => {
                    if (value === undefined || value === null) return true;
                    // Check if the value has up to two decimal places
                    return /^\d+(\.\d{1,2})?$/.test(value);
                });
                break;
            //     .number(rule.value)
            //     .test(
            //         "is-decimal",
            //         "The amount should be a decimal with maximum two digits after comma",
            //         (val: any) => {
            //             if (val != undefined) {
            //                 return /^\d+(\.\d{0,2})?$/.test(val);
            //             }
            //             return true;
            //         }
            //     ); break;
            default:
                schema = schema.required(rule.message);
                break;
        }
    }

    return schema
}


export const getInputs = <T>(section: FormSection) => {

    let initialValues: { [key: string]: any } = {};

    let validationsFields: { [key: string]: any } = {};

    for (const field of forms[section]) {

        initialValues[field.name] = field.value;

        if (!field.validations) continue;

        const schema = generateValidations(field)

        validationsFields[field.name] = schema;
    }

    return {
        validationSchema: Yup.object({...validationsFields}),
        initialValues: initialValues as T,
        inputs: forms[section],
    };

};
