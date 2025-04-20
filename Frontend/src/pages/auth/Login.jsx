import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  CircularProgress
} from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../services/userAuthApi';
import { storeToken } from '../../services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../../features/authSlice';
import Nav from '../../components/Nav';

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError({});
    setLoginSuccess(false);
    
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const res = await loginUser(actualData);
      if (res.error) {
        setServerError(res.error.data.errors || {});
        setLoginSuccess(false);
      } else if (res.data) {
        setServerError({});
        setLoginSuccess(true);
        storeToken(res.data.token);
        dispatch(setUserToken({ access_token: res.data.token.access }));
        navigate("/search");
      }
    } catch (error) {
      setServerError({ non_field_errors: ['An unexpected error occurred. Please try again.'] });
      setLoginSuccess(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: theme.palette.background.default,
          padding: isMobile ? 0 : theme.spacing(2),
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 460,
            padding: theme.spacing(4),
            borderRadius: '8px',
            backgroundColor: theme.palette.background.paper,
            boxShadow: isMobile ? 'none' : '0px 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
          component="form"
          noValidate
          onSubmit={handleSubmit}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              color: theme.palette.text.secondary, 
              fontWeight: 'bold', 
              mb: 2,
              fontFamily: theme.typography.fontFamily 
            }}
          >
            Carnest
          </Typography>
          <Typography 
            variant="h6" 
            component="div" 
            gutterBottom
            sx={{ fontFamily: theme.typography.fontFamily }}
          >
            Log Into Carnest
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="textSecondary" 
            gutterBottom
            sx={{ fontFamily: theme.typography.fontFamily }}
          >
            Welcome back!
          </Typography>

          <TextField
            fullWidth
            required
            id="email"
            name="email"
            label="Email Address"
            variant="outlined"
            margin="normal"
            error={Boolean(serverError.email)}
            helperText={serverError.email ? serverError.email[0] : ''}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.87)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.text.secondary,
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(0, 0, 0, 0.6)',
                '&.Mui-focused': {
                  color: theme.palette.text.secondary,
                },
              },
            }}
          />
          <TextField
            fullWidth
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            error={Boolean(serverError.password)}
            helperText={serverError.password ? serverError.password[0] : ''}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.87)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.text.secondary,
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(0, 0, 0, 0.6)',
                '&.Mui-focused': {
                  color: theme.palette.text.secondary,
                },
              },
            }}
          />

          <Box sx={{ mb: 2 }}>
            <Link
              href="/forgotpassword"
              sx={{ 
                display: 'block', 
                textAlign: 'right',
                color: theme.palette.text.secondary,
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': {
                  color: theme.palette.button.secondary,
                  textDecoration: 'underline'
                }
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          {isLoading ? (
            <CircularProgress sx={{ mt: 2 }} />
          ) : (
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: theme.palette.button.primary,
                color: theme.palette.button.text.white,
                mt: theme.spacing(2),
                '&:hover': { 
                  backgroundColor: theme.palette.button.secondary 
                },
                ...theme.typography.button
              }}
            >
              Log In
            </Button>
          )}

          {serverError.non_field_errors && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {serverError.non_field_errors[0]}
            </Alert>
          )}

          {loginSuccess && (
            <Alert 
              severity="success" 
              sx={{ 
                mt: 2,
                backgroundColor: '#4caf50',
                color: '#fff',
                '& .MuiAlert-icon': {
                  color: '#fff'
                }
              }}
            >
              Login successful! Redirecting...
            </Alert>
          )}

          <Link 
            href="/register" 
            sx={{ 
              mt: 2, 
              display: 'block',
              color: theme.palette.text.secondary,
              '&:hover': {
                color: theme.palette.button.secondary
              }
            }}
          >
            Don't have an account? Sign up
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
