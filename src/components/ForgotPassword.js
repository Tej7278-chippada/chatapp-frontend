// components/ForgotPassword.js
import React, { useEffect, useState } from 'react';
import { TextField, Button, Alert, Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
// import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    let timer;
    if (resendDisabled && resendTimer > 0) {
      timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    } else if (resendTimer === 0) {
      setResendDisabled(false);
      setResendTimer(60); // Reset timer for the next resend
    }
    return () => clearInterval(timer);
  }, [resendDisabled, resendTimer]);

  // Regex to validate password format
  const passwordRegex = /^[A-Za-z][A-Za-z0-9@]{7,}$/;

  const handleRequestOtp = async () => {
    setLoading(true);
    try {
      // Send request to backend to initiate OTP process  // 'http://localhost:5002/api/auth/request-otp'
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/request-otp`, { username, contact });
      setSuccess('OTP sent to your email or phone number');
      setError('');
      setStep(2); // Move to the OTP verification step
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error sending OTP';
      setError(errorMessage === 'contact_not_matched' 
        ? "Entered Email or phone number doesn't match to the user's data"
        : errorMessage);
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/resend-otp`, { username, contact });
      setSuccess('New OTP sent to your email or phone number');
      setError('');
      setResendDisabled(true); // Disable resend button for 1 minute
    } catch (error) {
      setError(error.response?.data?.message || 'Error resending OTP');
      setSuccess('');
    }
    finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setError('New Password and Confirm Password do not match');
      return;
    }
    if (!passwordRegex.test(newPassword)) {
      setError('Password must be at least 8 characters, start with a letter, include at least one number, and contain @');
      return;
    }
    setLoading(true);
    try {
      // Send OTP and new password to backend for validation and password reset // 'http://localhost:5002/api/auth/reset-password'
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/reset-password`, {
        username,
        contact,
        otp,
        newPassword,
      });
      setSuccess(`Your password has been reset successfully for account: ${username}`);
      setError('');
      setStep(3); // Move to success step
    } catch (error) {
      setError(error.response?.data?.message === 'otp_invalid' 
        ? 'OTP not valid, or please verify the OTP'
        : error.response?.data?.message || 'Error resetting password');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" maxWidth="400px" margin="auto" padding={3} sx={{ gap: 2 }}>
        <Typography variant="h5" gutterBottom>Forgot Password</Typography>
        {step === 1 && (
          <>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Email or Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <Button variant="contained" color="primary" fullWidth onClick={handleRequestOtp} disabled={loading} style={{ marginTop: '1rem' }}>
            {loading ? <CircularProgress size={24} /> : 'Request OTP'}
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
            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
              margin="normal"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            {success && <Alert severity="success" style={{ marginTop: '10px' }}>{success}</Alert>}
            {error && <Alert severity="error" style={{ marginTop: '10px' }}>{error}</Alert>}
            <Button variant="outlined" color="secondary" fullWidth onClick={handleResendOtp} disabled={resendDisabled || loading} >
              {resendDisabled ? `Resend OTP (${resendTimer}s)` : 'Resend OTP'}
            </Button>
            <Button variant="contained" color="primary" fullWidth onClick={handleResetPassword} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Reset Password'}
            </Button>
          </>
        )}
        {step === 3 && (
          <>
            <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>
            {/* <Button variant="contained" color="primary" fullWidth onClick={() => navigate('/register')}>
              Go to Login
            </Button> */}
          </>
        )}
      </Box>
  );
};

export default ForgotPassword;
