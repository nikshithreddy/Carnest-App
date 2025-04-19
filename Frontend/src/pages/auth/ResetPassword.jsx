import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../services/userAuthApi";
import Nav from "../../components/Nav";

const ResetPassword = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [serverError, setServerError] = useState({});
  const [serverMessage, setServerMessage] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear previous error and success states
    setServerError({});
    setServerMessage("");
    
    const data = new FormData(e.currentTarget);
    const actualData = {
      password: data.get("password"),
      password2: data.get("password2"),
    };

    try {
      const res = await resetPassword({ actualData, id, token });
      if (res.error) {
        setServerError(res.error.data.errors || {});
        setServerMessage("");
      } else if (res.data) {
        setServerError({});
        setServerMessage(res.data.msg || "Password reset successful! Redirecting to login...");
        document.getElementById("reset-password-form").reset();
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (error) {
      setServerError({ non_field_errors: ['An unexpected error occurred. Please try again.'] });
      setServerMessage("");
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
          id="reset-password-form"
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
            Reset Your Password
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="textSecondary" 
            gutterBottom
            sx={{ fontFamily: theme.typography.fontFamily }}
          >
            Enter your new password below.
          </Typography>

          <TextField
            fullWidth
            required
            id="password"
            name="password"
            label="New Password"
            type="password"
            variant="outlined"
            margin="normal"
            error={Boolean(serverError.password)}
            helperText={serverError.password ? serverError.password[0] : ""}
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
            id="password2"
            name="password2"
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            error={Boolean(serverError.password2)}
            helperText={serverError.password2 ? serverError.password2[0] : ""}
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
                Reset Password
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

          <Divider sx={{ marginY: 2 }}>or</Divider>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: theme.palette.button.secondary,
              color: theme.palette.button.text.white,
              '&:hover': {
                backgroundColor: theme.palette.button.primary
              },
              ...theme.typography.button
            }}
            href="/login"
          >
            Back to Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
