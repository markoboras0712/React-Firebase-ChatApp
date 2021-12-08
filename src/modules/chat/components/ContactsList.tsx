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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export const ContactsList: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
      <main>
        <Container sx={{ py: 8 }} fixed>
          <Grid container spacing={8}>
            {cards.map((card) => (
              <Grid item key={card} xs={6} md={3}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="img"
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 2 }}>
                    <Typography variant="h5" component="h5">
                      Heading
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
