import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Checkbox,
  FormControlLabel,
  Alert,
} from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../services/userAuthApi';
import { storeToken } from '../../services/LocalStorageService';
import Nav from '../../components/Nav';

const Register = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [serverError, setServerError] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterSuccess(false);
    const data = new FormData(e.currentTarget);
    const actualData = {
      first_name: data.get('first_name'),
      last_name: data.get('last_name'),
      email: data.get('email'),
      phone_number: data.get('phone_number'),
      password: data.get('password'),
      password2: data.get('password2'),
      terms_and_conditions_accepted: termsAccepted
    };

    try {
      const res = await registerUser(actualData);
      if (res.error) {
        setServerError(res.error.data.errors);
        setRegisterSuccess(false);
      } else if (res.data) {
        setRegisterSuccess(true);
        storeToken(res.data.token);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setServerError({ non_field_errors: ['An unexpected error occurred. Please try again.'] });
      setRegisterSuccess(false);
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
            Create a new account
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="textSecondary" 
            gutterBottom
            sx={{ fontFamily: theme.typography.fontFamily }}
          >
            It's quick and easy.
          </Typography>

          <Box display="flex" gap={1} mb={2}>
            <TextField
              name="first_name"
              label="First Name"
              variant="outlined"
              fullWidth
              required
              error={Boolean(serverError.first_name)}
              helperText={serverError.first_name ? serverError.first_name[0] : ''}
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
              name="last_name"
              label="Last Name"
              variant="outlined"
              fullWidth
              required
              error={Boolean(serverError.last_name)}
              helperText={serverError.last_name ? serverError.last_name[0] : ''}
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
          </Box>

          <TextField
            name="phone_number"
            label="Mobile Number"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            error={Boolean(serverError.phone_number)}
            helperText={serverError.phone_number ? serverError.phone_number[0] : ''}
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
            name="email"
            label="Email Address"
            variant="outlined"
            fullWidth
            margin="normal"
            required
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
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
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

          <TextField
            name="password2"
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            error={Boolean(serverError.password2)}
            helperText={serverError.password2 ? serverError.password2[0] : ''}
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

          <FormControlLabel
            control={
              <Checkbox
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                name="terms_and_conditions_accepted"
                color="primary"
                sx={{
                  color: theme.palette.text.secondary,
                  '&.Mui-checked': {
                    color: theme.palette.text.secondary,
                  },
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                I agree to the terms and conditions.
              </Typography>
            }
          />
          {serverError.terms_and_conditions_accepted && (
            <Typography sx={{ color: 'red', fontSize: 12 }}>
              {serverError.terms_and_conditions_accepted[0]}
            </Typography>
          )}

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
            disabled={isLoading}
          >
            {isLoading ? 'Signing Up...' : 'Register'}
          </Button>

          {serverError.non_field_errors && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {serverError.non_field_errors[0]}
            </Alert>
          )}

          {registerSuccess && (
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
              Registration successful! Redirecting to login page...
            </Alert>
          )}

          <Link 
            href="/login" 
            sx={{ 
              mt: 2, 
              display: 'block',
              color: theme.palette.text.secondary,
              '&:hover': {
                color: theme.palette.button.secondary
              }
            }}
          >
            Already have an account?
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
