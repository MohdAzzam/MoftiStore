import * as Yup from 'yup';

const USER_FORM_VALIDATIONS = Object.freeze({
    PHONE_NUMBER: Yup.string().required('phonenum.req'),
    EMAIL:Yup.string().email('please type a correct email')
    .required('email.req')
});

export {
    USER_FORM_VALIDATIONS
}