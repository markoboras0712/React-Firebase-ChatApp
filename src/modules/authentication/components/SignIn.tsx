import { navigate } from '@reach/router';
import googleLogo from 'assets/google.png';
import { Routes } from 'fixtures';
import { useAuthentication, LoginData } from 'modules/authentication';
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

          <div className={classes.form__actions}>
            <Button type="button" onClick={() => navigate(Routes.Register)}>
              Create new account
            </Button>
            <button
              type="button"
              className={classes.form__google}
              onClick={() => loginWithGoogle()}
            >
              <img src={googleLogo} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
