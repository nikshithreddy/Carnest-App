import React, { useState } from 'react'
import { useTheme } from '@mui/system';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
} from '@mui/material';
import CarnestLogo from '../assets/car-sharing-logo.png';
 
 
const Nav = () => {
  const theme = useTheme();

  return (
    <AppBar position="static" sx={{ backgroundColor: 'background.paper', borderRadius: '30px', boxShadow: 'none', zIndex: 1001,maxWidth:'90%',mx: 'auto',marginTop:'10px'}}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
 
        {/* Logo and Brand Name */}
        <Box sx={{ display: 'flex', alignItems: 'center' ,ml:theme.spacing(2)}}>
          <img src={CarnestLogo} alt="Carnest Logo" style={{ height: '35px', marginRight: '5px', marginBottom: '10px' }} />
          <Typography variant="h6"
           sx={{ textDecoration: 'none', color: 'text.primary' }}>
            Carnest
          </Typography>
        </Box>

        {/* Login/Signup Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'button.primary',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 500,
            fontSize:'18px',
            mr: theme.spacing(2),
            width: 'auto',
            '&:hover': { backgroundColor: 'button.secondary' },
          }}
        >
          Login / Signup
        </Button>


      </Toolbar>
    </AppBar>
  )
}
 
export default Nav;