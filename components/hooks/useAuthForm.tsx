import {useForm, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FormData {
  email: string;
  password: string;
}

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const useAuthForm = (onSubmit: SubmitHandler<FormData>) => {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  return {
    handleSubmit,
    control,
    errors,
  };
};

export default useAuthForm;
