/* eslint-disable @typescript-eslint/no-unused-vars */
import { Copyright } from 'modules/chat/components/Copyright';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigation } from 'components/layout/Navigation';
import { useEffect, useState } from 'react';
import { useMessages } from 'modules/chat';
import { fetchUsers } from 'modules/users';
import { useDispatch, useSelector } from 'react-redux';
import { useUsers } from 'modules/users/hooks/useUsers';
import { RootState } from 'modules/redux-store';
import { useContacts } from 'modules/users/hooks/useContacts';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export const ContactsList: React.FC = () => {
  const contacts = useContacts();
  console.log('Contacts', contacts);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
      <main>
        <Container sx={{ py: 8 }} fixed>
          <Grid container spacing={8}>
            {contacts.map(({ email, uid, userName, userPhoto }) => (
              <Grid item key={uid} xs={6} md={3}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={userPhoto as string}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 2 }}>
                    <Typography variant="h5" component="h5">
                      {userName}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="large">Chat</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
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
