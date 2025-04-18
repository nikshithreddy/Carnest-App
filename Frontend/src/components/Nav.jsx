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
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import CarnestLogo from '../assets/car-sharing-logo.png';
 
const Nav = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
 
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handleClose = () => {
    setAnchorEl(null);
  }; 

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: theme.palette.background.paper, 
        borderRadius: 'none', 
        boxShadow: 'none', 
        zIndex: 1001, 
        mx: 'auto'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
 
        {/* Logo and Brand Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', ml: theme.spacing(2) }}>
          <img src={CarnestLogo} alt="Carnest Logo" style={{ height: '35px', marginRight: '5px', marginBottom: '10px' }} />
          <Typography 
            variant="h6" 
            component={NavLink} 
            to="/search"
            sx={{ 
              textDecoration: 'none', 
              color: theme.palette.text.primary,
              fontFamily: theme.typography.fontFamily
            }}
          >
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
                sx={{ color: theme.palette.text.primary }}
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
                <MenuItem 
                  onClick={() => { navigate('/login'); handleClose(); }}
                  sx={{ 
                    backgroundColor: location.pathname === '/login' ? 'rgba(255, 100, 54, 0.1)' : 'transparent',
                    color: location.pathname === '/login' ? theme.palette.button.primary : theme.palette.text.primary,
                    fontFamily: theme.typography.fontFamily,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 100, 54, 0.1)',
                    }
                  }}
                >
                  Login
                </MenuItem>
                <MenuItem 
                  onClick={() => { navigate('/register'); handleClose(); }}
                  sx={{ 
                    backgroundColor: location.pathname === '/register' ? 'rgba(255, 100, 54, 0.1)' : 'transparent',
                    color: location.pathname === '/register' ? theme.palette.button.primary : theme.palette.text.primary,
                    fontFamily: theme.typography.fontFamily,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 100, 54, 0.1)',
                    }
                  }}
                >
                  Signup
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant={location.pathname === '/login' ? "contained" : "outlined"}
                onClick={() => navigate('/login')}
                sx={{
                  color: location.pathname === '/login' ? theme.palette.button.text.white : theme.palette.button.text.primary,
                  backgroundColor: location.pathname === '/login' ? theme.palette.button.primary : 'transparent',
                  borderColor: theme.palette.button.border.primary,
                  fontFamily: theme.typography.fontFamily,
                  ...theme.typography.button,
                  '&:hover': {
                    borderColor: theme.palette.button.border.primary,
                    backgroundColor: location.pathname === '/login' ? theme.palette.button.secondary : 'transparent',
                    color: location.pathname === '/login' ? theme.palette.button.text.white : theme.palette.button.text.secondary,
                  }
                }}
              >
                Login
              </Button>
              <Button
                variant={location.pathname === '/register' ? "contained" : "outlined"}
                onClick={() => navigate('/register')}
                sx={{
                  color: location.pathname === '/register' ? theme.palette.button.text.white : theme.palette.button.text.primary,
                  backgroundColor: location.pathname === '/register' ? theme.palette.button.primary : 'transparent',
                  borderColor: theme.palette.button.border.primary,
                  fontFamily: theme.typography.fontFamily,
                  ...theme.typography.button,
                  '&:hover': {
                    borderColor: theme.palette.button.border.primary,
                    backgroundColor: location.pathname === '/register' ? theme.palette.button.secondary : 'transparent',
                    color: location.pathname === '/register' ? theme.palette.button.text.white : theme.palette.button.text.secondary,
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