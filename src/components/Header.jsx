// Header.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';

const Header = ({ username }) => {
  const location = useLocation();
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ChatApp
          </Typography>
          {location.pathname === '/chat' && username && (
            <Typography variant="body1">
              {username}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
