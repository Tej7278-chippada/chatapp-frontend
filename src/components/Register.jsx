import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateUsername = (username) => {
    const usernameRegex = /^[A-Za-z][A-Za-z0-9@_]{6,}$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateUsername(username)) {
      setError('Username must start with a letter, contain @ or _, and at least one number.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and include letters, numbers, and @.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', { username, password });
      if (response.status === 201) {
        // Redirect to login after successful registration
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during registration');
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleRegister}
      sx={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}
    >
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>

      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        margin="normal"
        required
      />

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Register
      </Button>
    </Box>
  );
};

export default Register;
