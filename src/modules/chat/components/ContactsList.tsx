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
import { useContacts } from 'modules/users/hooks/useContacts';

const theme = createTheme();

export const ContactsList: React.FC = () => {
  const contacts = useContacts();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} fixed>
          <Grid container spacing={8}>
            {contacts.map(({ uid, userName, userPhoto }) => (
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
                    height="200"
                    alt="random"
                  />
                  <CardContent>
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
