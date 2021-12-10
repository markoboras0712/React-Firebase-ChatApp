/* eslint-disable @typescript-eslint/no-unused-vars */
import classes from './SignIn.module.css';

export const SignIn: React.FC = () => {
  return (
    <div>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="text" required id="email" />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="password" required id="password" />
        </div>
        <div className={classes.actions}>
          <button type="submit">Login</button>
          <button type="submit">Register</button>
          <button type="submit">Forgot Password</button>
          <button type="submit">Sign in With Google</button>
        </div>
      </form>
    </div>
  );
};
