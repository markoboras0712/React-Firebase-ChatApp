/* eslint-disable @typescript-eslint/no-unused-vars */
import classes from './SignIn.module.css';

export const Register: React.FC = () => {
  return (
    <div>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="firstName">First Name</label>
          <input type="text" required id="firstName" />
        </div>
        <div className={classes.control}>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" required id="lastName" />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="text" required id="email" />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="password" required id="password" />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Profile Photo</label>
          <input type="file" required id="image" />
        </div>
        <div className={classes.actions}>
          <button type="submit">Register</button>
          <button type="submit">Already have account?</button>
          <button type="submit">Sign in With Google</button>
        </div>
      </form>
    </div>
  );
};
