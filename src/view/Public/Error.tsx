import {
  Button,
  Link,
  Typography,
  Box,
  CssBaseline,
  Container,
} from '@mui/material';
import { navigate } from '@reach/router';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://prototyp.digital/">
        PROTOTYP
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const NotFound: React.FC = () => {
  const returnHomeHandler = () => {
    navigate('/messages');
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'UH OH! You are lost'}
        </Typography>
        <Typography variant="body1">
          The page you are looking for does not exist. How you get here is a
          mistery. But you can click the button below to go back to the homepage
        </Typography>
        <Button
          type="submit"
          fullWidth
          onClick={returnHomeHandler}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          HOME
        </Button>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
};
