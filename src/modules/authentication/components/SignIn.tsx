import { Link } from '@reach/router';
import { Routes } from 'fixtures';
import { useAuthentication, LoginData } from 'modules/authentication';
import { ReactComponent as GoogleIcon } from 'assets/googleSVG.svg';
import { useForm } from 'react-hook-form';
import classes from './style/SignIn.module.css';
import { Input, Button } from 'components';

export const SignIn: React.FC = () => {
  const { loginWithGoogle, loginWithEmailPassword, resetPassword } =
    useAuthentication();
  const { register, handleSubmit, formState } = useForm<LoginData>({
    mode: 'onChange',
  });
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
            {...register('password', {
              required: true,
            })}
          />

          <Button
            type="submit"
            onClick={onSubmit}
            disabled={!formState.isValid}
          >
            Login
          </Button>
          <Button
            type="button"
            onClick={passwordResetHandler}
            disabled={!formState.isValid}
          >
            Forgot your password?
          </Button>

          <div
            className={classes.form__google}
            onClick={() => loginWithGoogle()}
          >
            <div className={classes.form__google__img}>
              <GoogleIcon />
            </div>
            <span>Sign in with Google</span>
          </div>

          <div className={classes.form__actions}>
            <Link to={Routes.Register} style={{ textDecoration: 'none' }}>
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
