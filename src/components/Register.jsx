import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import Layout from './Layout';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // Validate username and password
    const usernameRegex = /^[A-Z][A-Za-z0-9@_-]{5,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*@).{8,}$/;

    if (!usernameRegex.test(username)) {
      setError(
        'Username must start with a capital letter, be at least 6 characters long, contain at least one number, and can include @, _, or -. No lowercase letters allowed.'
      );
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        'Password must be at least 8 characters long, contain at least one letter, one number, and include @.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('Password and confirm password do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5002/api/auth/register', { username, password });
      setSuccess(`Your new account has been created with username: ${username}`);
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      if (response.status === 201) {
        // window.location.href = '/';
      }
    } catch (error) {
      setError(error.response.data.message || 'An error occurred during registration.');
    }
  };

  return (
    <Layout>
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleRegister} style={{ maxWidth: '400px', width: '100%' }}>
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
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
        <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
          Already have an account?{' '}
          <Button href="/" variant="text">
            Login
          </Button>
        </Typography>
      </form>
    </Box>
    </Layout>
  );
};

export default Register;
