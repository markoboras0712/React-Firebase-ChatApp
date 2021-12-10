/* eslint-disable @typescript-eslint/no-unused-vars */
import { Copyright } from 'modules/chat/components/Copyright';
import {
  CssBaseline,
  Box,
  Container,
  Grid,
  Paper,
  Button,
  CardContent,
  CardActions,
  Card,
  Avatar,
  Typography,
  CardMedia,
  CardActionArea,
} from '@mui/material';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { Navigation } from 'components/layout/Navigation';
import { Chat } from 'modules/chat/components/Chat';
import { NavigationBar } from 'components/layout/NavigationBar';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const theme = createTheme();

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'start',
  color: theme.palette.text.secondary,
}));

export const MessagesList: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ py: 8 }} fixed>
        <Grid
          container
          spacing={6}
          direction="column"
          justifyContent="center"
          alignItems="stretch"
        >
          {cards.map((card) => (
            <Grid item key={card} xs={6} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
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
      <Box
        sx={{ bgcolor: 'background.paper', py: 3, px: 2, mt: 'auto' }}
        component="footer"
      >
        <Container maxWidth="md">
          <Copyright />
        </Container>
        <Chat />
      </Box>
    </ThemeProvider>
  );
};
