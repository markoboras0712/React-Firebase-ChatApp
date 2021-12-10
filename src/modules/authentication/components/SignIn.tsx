/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuthentication } from 'modules/authentication';
import classes from './SignIn.module.css';

type LoginData = {
  email: string;
  password: string;
};

export const SignIn: React.FC = () => {
  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <h1 className={classes.form__title}>Sign In</h1>
        <div>
          <input
            type="text"
            required
            id="email"
            placeholder="Email address"
            name="email"
            className={classes.form__input}
          />

          <input
            type="password"
            required
            id="password"
            placeholder="Password"
            name="password"
            className={classes.form__input}
          />
          <br />
          <button type="submit" className={classes.form__button}>
            Login
          </button>

          <button type="submit" className={classes.form__button}>
            Sign in with Google
          </button>
          <br />
          <div className={classes.form__actions}>
            <button type="button" className={classes.form__button}>
              Forgot your password?
            </button>
            <button type="button" className={classes.form__button}>
              Don't have account?
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
