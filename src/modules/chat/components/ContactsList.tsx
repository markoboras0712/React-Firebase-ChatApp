/* eslint-disable @typescript-eslint/no-unused-vars */
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Copyright } from 'modules/chat/components/Copyright';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from 'components/layout/ResponsiveAppBar';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function ContactsList() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResponsiveAppBar />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
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
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Chat</Button>
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
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
