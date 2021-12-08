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
  Stack,
  Paper,
} from '@mui/material';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { Navigation } from 'components/layout/Navigation';
import { Chat } from 'modules/chat/components/Chat';

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
      <CssBaseline />
      <Navigation />
      <Stack
        direction="column"
        sx={{ mt: 3 }}
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={6}
      >
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
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
