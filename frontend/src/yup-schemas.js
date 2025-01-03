import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup
    .string()
    .min(4, 'Username must be atleast 4 characters long')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username must contain only letters, numbers, and underscores'
    )
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/\d/, 'Must contain at least one number')
    .matches(
      /[!@#$%^&*()_+{}[\]|:;"'<>,.?~\\-]/,
      'Must contain at least one special character'
    )
    .required('Password is required'),
});

export const registerSchema = yup.object({
  username: yup
    .string()
    .min(4, 'Username must be atleast 4 characters long')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username must contain only letters, numbers, and underscores'
    )
    .required('Username is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/\d/, 'Must contain at least one number')
    .matches(
      /[!@#$%^&*()_+{}[\]|:;"'<>,.?~\\-]/,
      'Must contain at least one special character'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});
