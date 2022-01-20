import { Link } from '@reach/router';
import { Register, useAuthentication } from 'modules/authentication';
import { ReactComponent as GoogleIcon } from 'assets/googleSVG.svg';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import classes from './style/SignUp.module.css';
import { Routes } from 'fixtures';
import { Input, Button } from 'components';
import React from 'react';

export const SignUp: React.FC = () => {
  const { registerWithEmailPassword, loginWithGoogle } = useAuthentication();
  const [uploadedImage, setUploadedImage] = useState<File>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>();

  const fileSelectHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUploadedImage(event.target.files[0]);
    }
  };

  const onSubmit = handleSubmit((data: Register) => {
    if (uploadedImage === undefined) {
      alert('You didnt upload your picture');
      return;
    }
    registerWithEmailPassword(data, uploadedImage);
  });
  const handleGoogleLogin = React.useCallback(() => loginWithGoogle(), []);

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
          <div className={classes.form__google} onClick={handleGoogleLogin}>
            <div className={classes.form__google__img}>
              <GoogleIcon />
            </div>
            <span>Sign in with Google</span>
          </div>
          <div className={classes.form__actions}>
            <Link to={Routes.Login} style={{ textDecoration: 'none' }}>
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};