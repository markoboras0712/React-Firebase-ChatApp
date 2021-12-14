import { navigate } from '@reach/router';
import { RegisterData, useAuthentication } from 'modules/authentication';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import classes from './style/Register.module.css';
import { Input, Button } from 'components';

type FormData = {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  photoUrl: File[];
};

export const Register: React.FC = () => {
  const { registerWithEmailPassword, loginWithGoogle } = useAuthentication();
  const [uploadedImage, setUploadedImage] = useState<File>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const fileSelectHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    setUploadedImage(event.target.files[0]);
  };
  const onSubmit = handleSubmit((data: FormData) => {
    const registerData: RegisterData = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      uploadedPhoto: uploadedImage,
    };
    registerWithEmailPassword(registerData);
  });

  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <h1 className={classes.form__title}>Sign Up</h1>
        <div>
          <Input
            type="text"
            required
            id="firstName"
            placeholder="First Name"
            {...register('firstName', { required: true })}
          />
          {errors.firstName?.type === 'required' && 'First name is required'}
          <Input
            type="text"
            required
            id="lastName"
            placeholder="Last Name"
            {...register('lastName', { required: true })}
          />
          {errors.lastName?.type === 'required' && 'Last name is required'}
          <Input
            type="email"
            required
            id="email"
            placeholder="Email address"
            {...register('email', { required: true })}
          />
          {errors.email?.type === 'required' && 'Email is required'}
          <Input
            type="password"
            required
            id="password"
            placeholder="Password"
            {...register('password', { required: true })}
          />
          {errors.password?.type === 'required' && 'Password is required'}
          <Input type="file" id="userPhoto" onChange={fileSelectHandler} />
          <Button type="submit" onClick={onSubmit}>
            Register
          </Button>
          <Button type="button" onClick={() => loginWithGoogle()}>
            Sign in with Google
          </Button>
          <Button type="button" onClick={() => navigate('/')}>
            Already have account?
          </Button>
        </div>
      </form>
    </div>
  );
};
