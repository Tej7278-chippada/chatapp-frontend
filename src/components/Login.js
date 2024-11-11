import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert, useMediaQuery, ThemeProvider, createTheme } from '@mui/material';
import axios from 'axios';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  // const [resetData, setResetData] = useState(''); // For email or phone number
  // const [resetMessage, setResetMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm')); // Media query for small screens

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
                                        // `${process.env.REACT_APP_API_URL}/transfer`
    try {                              // 'http://localhost:5002/api/auth/login' 'https://tej-chat-app-8cd7e70052a5.herokuapp.com/api/auth/login'
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { username, password });
      setSuccess(`You are logged in with username: ${username}`);
      setUsername('');
      setPassword('');

      const { authToken, tokenUsername } = response.data;
      if (authToken) {
        // Store the token in localStorage
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('tokenUsername', tokenUsername);
        // Redirect to chat page
        navigate('/chat'); // navigate(`/chat-${username}`);
      } else {
        setError('Token is missing in response');
      }
      
      // Redirect to chat page or dashboard here
      // if (response.status === 200) {
      //   window.location.href = '/chat';
      // }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError(`Username ${username} doesn't match any existing account.`);
      } else if (error.response && error.response.status === 401) {
        setError(`Password doesn't match for username: ${username}`);
      } else {
        setError('An error occurred while logging in.');
      }
    }
  };

  // const handleForgotPassword = () => {
  //   setForgotPasswordOpen(true);
  // };

  // const handleResetPassword = async () => {
  //   try {                     // 'http://localhost:5002/api/auth/forgot-password'
  //     const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/forgot-password`, { resetData });
  //     setResetMessage('Your password has been reset successfully');
  //     setResetData('');
  //     setForgotPasswordOpen(false);
  //   } catch (error) {
  //     setResetMessage('Error resetting password. Please try again.');
  //   }
  // };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <ThemeProvider theme={theme}>
    <Layout>
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="70vh"
    padding={isMobile ? 2 : 4} // Adjust padding for mobile
    >
      <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin} style={{ maxWidth: '400px', width: '100%' }}>
      {location.state?.message && <div>{location.state.message}</div>}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
          Login
        </Button>
        <Button variant="text" color="primary" fullWidth onClick={handleForgotPassword} style={{ marginTop: '10px' }}>
              Forgot Password?
            </Button>
        <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
          Don't have an account?{' '}
          {/* <Button href="/register" variant="text">
            Register  Can be used only site deployed on custom domain, cant use on static domain of netlify
          </Button> */}
          <Link to="/register" style={{ color: 'inherit', textDecoration: 'none', display: 'inline-block' }}>
            <Button variant="text">
              Register
            </Button>
          </Link>
        </Typography>
      </form>
    </Box>

    {/* Forgot Password Dialog */}
    {/* <Dialog open={forgotPasswordOpen} onClose={() => setForgotPasswordOpen(false)}>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogContent>
            <TextField
              label="Email or Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={resetData}
              onChange={(e) => setResetData(e.target.value)}
            />
            {resetMessage && <Alert severity="info" style={{ marginTop: '10px' }}>{resetMessage}</Alert>}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setForgotPasswordOpen(false)} color="secondary">Cancel</Button>
            <Button onClick={handleResetPassword} color="primary">Reset Password</Button>
          </DialogActions>
        </Dialog> */}
    </Layout>
    </ThemeProvider>
  );
};

export default Login;
