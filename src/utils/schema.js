import * as yup from 'yup';

export const customerSchema = yup.object().shape({
    name: yup.string().required(),
    age: yup.number().nonNullable(),
    dob: yup.date(),
    email: yup.string().email().required(),
    phone: yup.string().length(10).required(),
    fatherName: yup.string().required(),
    address: yup.string().max(200),
    pincode: yup.string().when('address', {
        is: (val) => !!val?.trim(), 
        then: (schema) => schema.length(6).required(),
        otherwise: (schema) => schema.notRequired()
    }),
    skills: yup.array().min(1).required(),
    comments: yup.string().max(800)
});