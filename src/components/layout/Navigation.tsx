/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from '@reach/router';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export const Navigation: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ p: 1 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Box>
          <Button
            color="info"
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};
