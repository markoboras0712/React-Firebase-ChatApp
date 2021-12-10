/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Navigation } from 'components/layout/Navigation';
import classes from './MockedChat.module.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, CssBaseline, Grid } from '@mui/material';
import { Typography } from 'antd';
import { Copyright } from 'modules/chat/components/Copyright';

const messages = [
  {
    id: '1',
    text: 'Prva poruka',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/react-chat-7b05a.appspot.com/o/Error-Page-Background.jpg?alt=media&token=1c18a222-83e5-4daf-ad67-e31ea6a9cd66',
    uid: '11111',
  },
  {
    id: '2',
    text: 'Druga poruka',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/react-chat-7b05a.appspot.com/o/Old_Trafford_inside_20060726_1.jpg?alt=media&token=f7f66bd9-fc3a-41db-9296-cd4cd02c743c',
    uid: '22222',
  },
  {
    id: '3',
    text: 'Treca poruka',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/react-chat-7b05a.appspot.com/o/SlackPicture.jpg?alt=media&token=d79aa495-106c-4a1d-9183-9a948f4eee4a',
    uid: '33333',
  },
  {
    id: '4',
    text: 'Cetvrta poruka',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/react-chat-7b05a.appspot.com/o/Error-Page-Background.jpg?alt=media&token=1c18a222-83e5-4daf-ad67-e31ea6a9cd66',
    uid: '44444',
  },
];
const theme = createTheme();

export const MockedChat: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '80vh' }}
        sx={{ backgroundColor: '#ffffff' }}
      >
        <Grid item xs={3} sx={{ backgroundColor: '#EBEBEB', width: 264 }}>
          <p>yo</p>
        </Grid>
        <Grid item xs={3} sx={{ backgroundColor: '#484848', width: 264 }}>
          <p>yo</p>
        </Grid>
      </Grid>
      <Box
        sx={{ bgcolor: 'background.paper', py: 3, px: 2, mt: 'auto' }}
        component="footer"
      >
        <Container maxWidth="md">
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

/*
<div className={classes.msgs}>
      {messages.map(({ id, text, photoUrl, uid }) => (
        <div>
          <div key={id} className={`${classes.msg} ${classes.sent}`}>
            <img src={photoUrl} alt="" />
            <p>{text}</p>
          </div>
        </div>
      ))}
    </div>
    */
