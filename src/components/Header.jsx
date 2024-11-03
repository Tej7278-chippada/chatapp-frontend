// Header.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, TextField, List, ListItem, ListItemText, ListItemIcon, Box, CircularProgress, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const Header = ({ username }) => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Only show search bar when user is logged in and on chat page
  const showSearchBar = location.pathname.includes('/chat') && username;

  // Handle search input change
  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      setLoading(true);
      try {
        const response = await axios.get(`https://tej-chat-app-8cd7e70052a5.herokuapp.com/api/users/search`, {
          params: { username: value }
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error searching usernames:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none', display: 'inline-block' }}>
            ChatApp
          </Link>
        </Typography>
        {/* Search Bar */}
        {showSearchBar && (
          <Box display="flex" alignItems="center" mr={2}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search usernames"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: <SearchIcon />, //sx={{ color: '#888' }}
              }}
              style={{ width: 200 }}
            />
            {/* Search results dropdown */}
            {searchTerm && (
              <Paper elevation={3} sx={{ position: 'absolute', top: '80%', mt: 1, zIndex: 10, maxWidth: 250 }}>
              <List style={{
                position: 'absolute', background: 'white', width: 250, boxShadow: '0 4px 8px rgba(0,0,0,0.2)', borderRadius: '4px'
              }}>
                {loading ? (
                  <ListItem>
                    <CircularProgress size={20} />
                  </ListItem>
                ) : (
                  searchResults.length > 0 ? (
                    searchResults.map((user) => (
                      <ListItem key={user.username}>
                        <ListItemIcon>
                          <CheckCircleIcon style={{ color: 'green' }} />
                        </ListItemIcon>
                        <ListItemText primary={user.username} />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText primary="Searched username doesn't match any existing username" />
                    </ListItem>
                  )
                )}
              </List>
              </Paper>
            )}
          </Box>
        )}
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
