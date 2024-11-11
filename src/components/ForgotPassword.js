// components/ForgotPassword.js
import React, { useState } from 'react';
import { TextField, Button, Alert, Typography, Box } from '@mui/material';
import axios from 'axios';
import Layout from './Layout';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const handleRequestOtp = async () => {
    try {
      // Send request to backend to initiate OTP process  // 'http://localhost:5002/api/auth/request-otp'
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/request-otp`, { username, contact });
      setSuccess('OTP sent to your email or phone number');
      setError('');
      setStep(2); // Move to the OTP verification step
    } catch (error) {
      setError(error.response?.data?.message || 'Error sending OTP');
      setSuccess('');
    }
  };

  const handleResetPassword = async () => {
    try {
      // Send OTP and new password to backend for validation and password reset // 'http://localhost:5002/api/auth/reset-password'
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/reset-password`, {
        username,
        contact,
        otp,
        newPassword,
      });
      setSuccess('Password reset successful');
      setError('');
      setStep(1); // Reset form after success
    } catch (error) {
      setError(error.response?.data?.message || 'Error resetting password');
      setSuccess('');
    }
  };

  return (
    <Layout>
    <Box display="flex" flexDirection="column" alignItems="center" maxWidth="400px" margin="auto">
      <Typography variant="h5" gutterBottom>Forgot Password</Typography>
      {step === 1 && (
        <>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email or Phone"
            fullWidth
            margin="normal"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleRequestOtp}>
            Request OTP
          </Button>
        </>
      )}
      {step === 2 && (
        <>
          <TextField
            label="OTP"
            fullWidth
            margin="normal"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleResetPassword}>
            Reset Password
          </Button>
        </>
      )}
      {success && <Alert severity="success" style={{ marginTop: '10px' }}>{success}</Alert>}
      {error && <Alert severity="error" style={{ marginTop: '10px' }}>{error}</Alert>}
    </Box>
    </Layout>
  );
};

export default ForgotPassword;
