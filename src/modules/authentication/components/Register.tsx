/* eslint-disable @typescript-eslint/no-unused-vars */
import classes from './Register.module.css';

export const Register: React.FC = () => {
  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <h1 className={classes.form__title}>Sign Up</h1>
        <div>
          <input
            type="text"
            required
            id="firstName"
            placeholder="First Name"
            name="firstName"
            className={classes.form__input}
          />
          <input
            type="text"
            required
            id="lastName"
            placeholder="Last Name"
            name="lastName"
            className={classes.form__input}
          />
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
          <input
            type="file"
            id="userPhoto"
            placeholder="Photo"
            name="userPhoto"
            className={classes.form__input}
          />
          <br />
          <button type="submit" className={classes.form__button}>
            Register
          </button>

          <button type="submit" className={classes.form__button}>
            Sign in with Google
          </button>
          <br />
          <div className={classes.form__actions}>
            <button type="button" className={classes.form__button}>
              Already have account?
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
