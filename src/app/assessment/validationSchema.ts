import * as Yup from 'yup';

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  comments: string;
  visa: string[];
  resume: FileList;
}

export const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  linkedin: Yup.string()
    .url('Invalid LinkedIn URL')
    .required('LinkedIn is required'),
  comments: Yup.string().required('This field is required'),
  visa: Yup.array().min(1),
  resume: Yup.mixed(),
});
