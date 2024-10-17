import React, { useState } from 'react';
import axios from 'axios';
// import { Box, TextField, Button, Typography } from '@mui/material';
import {useNavigate } from 'react-router-dom'; // Import useNavigate hook
const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      if (response.status === 200) {
        // Successful login
        const { token, user } = response.data;
        console.log('Login successful:', user);
        localStorage.setItem('token', token);  // Save JWT to localStorage
        // Redirect user to home page or show success message
        // Redirect to the chat page
        navigate('/chat');  // <-- This will redirect the user to the /chat route
      }
    } catch (error) {
      if (error.response) {
        // Response errors from server
        setError(error.response.data.message);
        console.error('Login error:', error.response.data.message);
        alert(error.response.data.message);  // Show error message to the user
      } else {
        // Network errors or other unexpected errors
        setError('An unexpected error occurred');
        console.error('Unexpected error:', error);
        alert('Unexpected error occurred. Please try again.');
      }
    }
  };
  

  return (
    // <Box>
    //   <Typography variant="h5">Login</Typography>
    //   <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
    //   <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //   <Button variant="contained" onClick={handleLogin}>Login</Button>
    // </Box>
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
