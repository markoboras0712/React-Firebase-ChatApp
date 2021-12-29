import { navigate } from '@reach/router';
import { RegisterData, useAuthentication } from 'modules/authentication';
import googleLogo from 'assets/google.png';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import classes from './style/Register.module.css';
import { Input, Button } from 'components';

export const Register: React.FC = () => {
  const { registerWithEmailPassword, loginWithGoogle } = useAuthentication();
  const [uploadedImage, setUploadedImage] = useState<File>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();
  const fileSelectHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUploadedImage(event.target.files[0]);
    }
  };
  const onSubmit = handleSubmit((data: RegisterData) => {
    if (uploadedImage === undefined) {
      alert('You didnt upload your picture');
      return;
    }
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
          <p className={classes.form__error}>
            {' '}
            {errors.firstName?.type === 'required' && 'First name is required'}
          </p>

          <Input
            type="text"
            required
            id="lastName"
            placeholder="Last Name"
            {...register('lastName', { required: true })}
          />
          <p className={classes.form__error}>
            {errors.lastName?.type === 'required' && 'Last name is required'}
          </p>
          <Input
            type="email"
            required
            id="email"
            placeholder="Email address"
            {...register('email', { required: true })}
          />
          <p className={classes.form__error}>
            {errors.email?.type === 'required' && 'Email is required'}
          </p>
          <Input
            type="password"
            required
            id="password"
            placeholder="Password"
            {...register('password', { required: true })}
          />
          <p className={classes.form__error}>
            {' '}
            {errors.password?.type === 'required' && 'Password is required'}
          </p>
          <Input type="file" id="userPhoto" onChange={fileSelectHandler} />
          <Button type="submit" onClick={onSubmit}>
            Register
          </Button>
          <div className={classes.form__actions}>
            <button
              type="button"
              className={classes.form__google}
              onClick={() => loginWithGoogle()}
            >
              <img src={googleLogo} />
            </button>
            <Button type="button" onClick={() => navigate('/')}>
              Already have account?
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
