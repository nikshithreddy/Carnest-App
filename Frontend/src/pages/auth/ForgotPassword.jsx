import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useSendPasswordResetEmailMutation } from "../../services/userAuthApi";
import Nav from "../../components/Nav";

const ForgotPassword = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [serverError, setServerError] = useState({});
  const [serverMessage, setServerMessage] = useState("");
  const [sendPasswordResetEmail, { isLoading }] = useSendPasswordResetEmailMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError({});
    setServerMessage("");
    
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
    };

    try {
      const res = await sendPasswordResetEmail(actualData);
      
      if (res.data) {
        setServerError({});
        setServerMessage("Password reset link has been sent to your email.");
        document.getElementById("forgot-password-form").reset();
      } else if (res.error) {
        const errorData = res.error.data;
        if (errorData.errors) {
          setServerError(errorData.errors);
        } else {
          setServerError({ non_field_errors: ['You are not a registered user.'] });
        }
      }
    } catch (error) {
      setServerError({ non_field_errors: ['An error occurred. Please try again.'] });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: theme.palette.background.default,
          padding: isMobile ? 0 : theme.spacing(2),
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 460,
            padding: theme.spacing(4),
            borderRadius: "8px",
            backgroundColor: theme.palette.background.paper,
            boxShadow: isMobile ? 'none' : "0px 4px 12px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
          component="form"
          noValidate
          id="forgot-password-form"
          onSubmit={handleSubmit}
        >
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: "bold",
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
            Forgot Password
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="textSecondary" 
            gutterBottom
            sx={{ fontFamily: theme.typography.fontFamily }}
          >
            Enter your email address and we'll send you a link to reset your password.
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
            helperText={serverError.email ? serverError.email[0] : ""}
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

          <Box>
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
                Send Reset Link
              </Button>
            )}
          </Box>

          {serverMessage && (
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
              {serverMessage}
            </Alert>
          )}

          {serverError.non_field_errors && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {serverError.non_field_errors[0]}
            </Alert>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
