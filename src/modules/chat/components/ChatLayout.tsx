/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import classes from './ChatLayout.module.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigation } from 'components/layout/Navigation';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Avatar, CssBaseline, IconButton } from '@mui/material';
import { Header } from 'antd/lib/layout/layout';

const theme = createTheme();

export default function ChatLayout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <header className={classes.header}>
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

        <div>yo</div>
        <div className={classes.push}>yo</div>
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
    </ThemeProvider>
  );
}
