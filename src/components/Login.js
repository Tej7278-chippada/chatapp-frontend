import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import Layout from './Layout';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5002/api/auth/login', { username, password });
      setSuccess(`You are logged in with username: ${username}`);
      setUsername('');
      setPassword('');
      // Redirect to chat page or dashboard here
      if (response.status === 200) {
        window.location.href = '/chat';
      }
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

  return (
    <Layout>
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin} style={{ maxWidth: '400px', width: '100%' }}>
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
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
          Don't have an account?{' '}
          <Button href="/register" variant="text">
            Register
          </Button>
        </Typography>
      </form>
    </Box>
    </Layout>
  );
};

export default Login;
