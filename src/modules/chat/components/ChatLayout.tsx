/* eslint-disable @typescript-eslint/no-unused-vars */
import classes from './ChatLayout.module.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, CssBaseline, IconButton } from '@mui/material';

export default function ChatLayout() {
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.arrow}>
          <svg
            width="13"
            height="20"
            viewBox="0 0 13 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.51 1.86998L10.73 0.0999756L0.839996 9.99998L10.74 19.9L12.51 18.13L4.38 9.99998L12.51 1.86998V1.86998Z"
              fill="black"
            />
          </svg>
        </div>

        <div className={classes.userPhoto}>
          <img
            src="https://i.pinimg.com/originals/be/2d/30/be2d307e7f0004d3b014ee1120756a93.png"
            alt="Avatar"
            className={classes.navigation__avatar}
          />
        </div>
        <div className={classes.userName}>
          <h4 className={classes.userName__name}>Marko Boras</h4>
        </div>

        <div className={classes.push}>
          <svg
            width="4"
            height="18"
            viewBox="0 0 4 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 11C3.10457 11 4 10.1046 4 9C4 7.89543 3.10457 7 2 7C0.89543 7 0 7.89543 0 9C0 10.1046 0.89543 11 2 11Z"
              fill="black"
            />
            <path
              d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z"
              fill="black"
            />
            <path
              d="M2 18C3.10457 18 4 17.1046 4 16C4 14.8954 3.10457 14 2 14C0.89543 14 0 14.8954 0 16C0 17.1046 0.89543 18 2 18Z"
              fill="black"
            />
          </svg>
        </div>
      </header>

      <section className={classes.section}>
        <article className={classes.article}>
          <h1>London</h1>
          <p>
            London is the capital city of England. It is the most populous city
            in the United Kingdom, with a metropolitan area of over 13 million
            inhabitants.
          </p>
          <p>
            Standing on the River Thames, London has been a major settlement for
            two millennia, its history going back to its founding by the Romans,
            who named it Londinium.
          </p>
        </article>
      </section>
    </div>
  );
}
