import React, { useState } from 'react'
import { useTheme } from '@mui/system';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Button,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import CarnestLogo from '../assets/car-sharing-logo.png';
 
const Nav = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
 
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handleClose = () => {
    setAnchorEl(null);
  }; 

  return (
    <AppBar position="static" sx={{ backgroundColor: 'background.paper', borderRadius: 'none', boxShadow: 'none', zIndex: 1001, mx: 'auto'}}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
 
        {/* Logo and Brand Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', ml: theme.spacing(2) }}>
          <img src={CarnestLogo} alt="Carnest Logo" style={{ height: '35px', marginRight: '5px', marginBottom: '10px' }} />
          <Typography variant="h6" component={NavLink} to="/search"
           sx={{ textDecoration: 'none', color: 'text.primary' }}>
            Carnest
          </Typography>
        </Box>

        {/* Login/Signup Buttons or Menu Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: theme.spacing(2) }}>
          {isMobile ? (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                sx={{ marginTop: '20px' }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => { navigate('/login'); handleClose(); }}>Login</MenuItem>
                <MenuItem onClick={() => { navigate('/register'); handleClose(); }}>Signup</MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/login')}
                sx={{
                  color: 'button.text.primary',
                  borderColor: 'button.border.primary',
                  '&:hover': {
                    borderColor: 'button.border.primary',
                    color: 'button.text.secondary',
                  }
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/register')}
                sx={{
                  backgroundColor: 'button.primary',
                  color: 'button.text.white',
                  '&:hover': {
                    backgroundColor: 'button.secondary',
                    color: 'button.text.white',
                  }
                }}
              >
                Signup
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
 
export default Nav;