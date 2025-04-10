import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import CarnestLogo from '../assets/car-sharing-logo.png';
 
 
const Nav = () => {

  return (
    <AppBar position="static" sx={{ backgroundColor: 'background.paper', borderRadius: '30px', boxShadow: 'none', zIndex: 1001 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
 
        {/* Logo and Brand Name */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={CarnestLogo} alt="Carnest Logo" style={{ height: '35px', marginRight: '5px', marginBottom: '10px' }} />
          <Typography variant="h6"
           sx={{ textDecoration: 'none', color: 'text.primary' }}>
            Carnest
          </Typography>
        </Box>


      </Toolbar>
    </AppBar>
  )
}
 
export default Nav;