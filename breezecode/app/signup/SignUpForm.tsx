import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const SignUpForm: React.FC = () => {
  const { push } = useRouter();

  const initialValues: SignUpFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .required('Required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
      ),
    confirmPassword: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password')], 'Passwords must match')
  });

  const handleSubmit = async (values: SignUpFormValues, actions: FormikHelpers<SignUpFormValues>) => {
    try {
      const response = await axios.post('/api/signup', values);
      alert(response.data.Message);
      push('/login');
      actions.resetForm();
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="w-full max-w-lg mx-auto mt-8 px-2">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block text-black font-semibold mb-2">
              First Name
            </label>
            <Field
              type="text"
              id="firstName"
              name="firstName"
              className="w-full p-2 border"
            />
            <ErrorMessage name="firstName" component="p" className="text-red-500" />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-black font-semibold mb-2">
              Last Name
            </label>
            <Field
              type="text"
              id="lastName"
              name="lastName"
              className="w-full p-2 border"
            />
            <ErrorMessage name="lastName" component="p" className="text-red-500" />
          </div>
        </div>

        {/* Email And Mobile number Start */}
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label htmlFor="email" className="block text-black font-semibold mb-2">
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border"
            />
            <ErrorMessage name="email" component="p" className="text-red-500" />
          </div>
        </div>
        {/* Email and Mobile number End */}

        {/* Password Start */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="password" className="block text-black font-semibold mb-2">
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border"
            />
            <ErrorMessage name="password" component="p" className="text-red-500" />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-black font-semibold mb-2">
              Confirm Password
            </label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full p-2 border"
            />
            <ErrorMessage name="confirmPassword" component="p" className="text-red-500" />
          </div>
        </div>
        {/* Password End */}

        {/* Accept Terms and Conditions */}
        <div className="mb-4">
          <label htmlFor="acceptTerms" className="flex items-center">
            <Field
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              className="mr-2"
            />
            <span className="text-black font-semibold">
              I accept the
              <a
                href="/termsncondition"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline ml-1"
              >
                terms and conditions
              </a>
            </span>
          </label>
          <ErrorMessage name="acceptTerms" component="p" className="text-red-500" />
        </div>
        {/* Terms and conditon end */}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-900"
        >
          Sign Up
        </button>
        <div className='flex justify-center items-center py-3'>
          <p className='px-2 text-slate-500'>Already have an account?</p>
          <Link className='px-1 text-md text-slate-800 hover:underline' href={'/login'}>Log In</Link>
        </div>
      </Form>
    </Formik>
  );
};

export default SignUpForm;
