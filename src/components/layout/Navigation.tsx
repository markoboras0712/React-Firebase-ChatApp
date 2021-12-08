import { Link } from '@reach/router';
import { useAuthentication } from 'modules/authentication';
import {
  AppBar,
  Box,
  Toolbar,
  Avatar,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/redux-store';

export const Navigation: React.FC = () => {
  const userPhoto = useSelector((state: RootState) => state.user.userPhoto);
  const { logoutUser } = useAuthentication();
  const handleSignOut = () => {
    logoutUser();
  };
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Box>
            <IconButton sx={{ p: 1 }}>
              <Avatar alt="Remy Sharp" src={userPhoto as string} />
            </IconButton>
          </Box>
          <Button
            color="info"
            sx={{ ml: 1 }}
            component={Link}
            to={'/contacts'}
            variant="contained"
          >
            Contacts
          </Button>

          <Button
            sx={{ ml: 1 }}
            color="info"
            component={Link}
            to={'/messages'}
            variant="contained"
          >
            Messages
          </Button>
          <Typography color="inherit" style={{ flex: 1 }} sx={{ ml: 1 }}>
            CHAT APP
          </Typography>

          <Button
            color="success"
            variant="contained"
            onClick={handleSignOut}
            sx={{ ml: 1 }}
          >
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
