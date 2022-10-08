import * as yup from 'yup';

export const FieldsValidation = {
  LoginValidationSchema: () =>
    yup.object().shape({
      email: yup
        .string()
        .email('Please enter valid email')
        .required('Email is required'),
      password: yup
        .string()
        .min(8, ({min}) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    }),
};
