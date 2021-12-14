import { navigate } from '@reach/router';
import { PublicAuthGuard, useAuthentication } from 'modules/authentication';
import { useForm } from 'react-hook-form';
import classes from './style/SignIn.module.css';
import { Input, Button } from 'components';

type LoginData = {
  email: string;
  password: string;
};

export const SignIn: React.FC = () => {
  const { loginWithGoogle, loginWithEmailPassword, resetPassword } =
    useAuthentication();
  const { register, handleSubmit } = useForm<LoginData>();
  const onSubmit = handleSubmit((data: LoginData) => {
    const loginData: LoginData = {
      email: data.email,
      password: data.password,
    };
    loginWithEmailPassword(loginData);
  });

  const passwordResetHandler = handleSubmit((data: LoginData) => {
    resetPassword(data.email);
  });

  return (
    <PublicAuthGuard>
      <div className={classes.container}>
        <form className={classes.form}>
          <h1 className={classes.form__title}>Sign In</h1>
          <div>
            <Input
              type="email"
              required
              id="email"
              placeholder="Email address"
              {...register('email', { required: true })}
            />
            <Input
              type="password"
              required
              id="password"
              placeholder="Password"
              {...register('password')}
            />

            <Button type="submit" onClick={onSubmit}>
              Login
            </Button>
            <Button type="button" onClick={() => loginWithGoogle()}>
              Sign in with Google
            </Button>

            <div className={classes.form__actions}>
              <Button type="button" onClick={passwordResetHandler}>
                Forgot your password?
              </Button>
              <Button type="button" onClick={() => navigate('/register')}>
                Create new account
              </Button>
            </div>
          </div>
        </form>
      </div>
    </PublicAuthGuard>
  );
};
