import React, { useEffect, useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
  useTheme,
  BottomNavigation,
  BottomNavigationAction,
  Avatar,
  Skeleton,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import CarnestLogo from '../assets/car-sharing-logo.png';
import { Search, DirectionsCar, List, Message } from '@mui/icons-material';
import { removeToken } from '../services/LocalStorageService';
import { useSelector, useDispatch } from 'react-redux';
import { unSetUserToken } from '../features/authSlice';
import { useUserProfileQuery } from '../services/userAuthApi';


const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // Access the token and derive `isLoggedIn` from Redux state
  const { access_token, profile } = useSelector((state) => state.auth);

  const { data, error, isLoading } = useUserProfileQuery(access_token, {
    skip: !access_token
  });

  const isLoggedIn = Boolean(access_token);

  const menuItems = [
    { name: 'Search', path: '/search', icon: <Search /> },
    { name: 'Post Ride', path: '/postride', icon: <DirectionsCar /> },
    { name: 'Your Rides', path: '/yourrides', icon: <List /> },
    { name: 'Messages', path: '/messages', icon: <Message /> },
  ];

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = async (url) => {
    navigate(`/${url}`);
    handleClose();
  }

  const handleLogout = () => {
    dispatch(unSetUserToken());
    removeToken();
    handleClose();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'background.paper', borderRadius: 'none', boxShadow: 'none', zIndex: 1001 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>

        {/* Logo and Brand Name */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={CarnestLogo} alt="Carnest Logo" style={{ height: '35px', marginRight: '5px', marginBottom: '10px' }} />
          <Typography 
            variant="h6" 
            component={NavLink} 
            to="/" 
            sx={{ textDecoration: 'none', color: 'text.primary' }}
          >
            Carnest
          </Typography>
        </Box>

        {/* Desktop Menu Items */}
        {!isMobile && isLoggedIn && <Box>
          {isLoading ?
            <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
              <Skeleton variant="rectangular" width={100} height={40} sx={{ mr: 2 }} />
              <Skeleton variant="rectangular" width={100} height={40} sx={{ mr: 2 }} />
              <Skeleton variant="rectangular" width={100} height={40} sx={{ mr: 2 }} />
              <Skeleton variant="rectangular" width={100} height={40} />
            </Box> : (
              <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
                {menuItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    style={({ isActive }) => ({
                      margin: '0 8px', textDecoration: 'none', color: isActive ? '#FF6436' : 'black', fontWeight: isActive ? 'bold' : 'normal',
                      display: 'flex', alignItems: 'center',
                    })}>
                    {item.icon}
                    <Typography sx={{ ml: 1 }}>{item.name}</Typography>
                  </NavLink>
                ))}
              </Box>
            )}</Box>}

        {/* Login/Signup or Profile Icon */}
        {isLoggedIn ? (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="black"
            >
              <Avatar 
                alt={profile?.first_name || 'User'} 
                src={profile?.profile_picture}
              >
                {profile?.first_name?.split('')[0] || 'U'}
              </Avatar>
            </IconButton>
            <Menu
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
              onClick={() => 
                handleMenuClick('userprofile')}
                >Profile</MenuItem>
              <MenuItem 
              onClick={() => handleMenuClick('vehicles')}
              >Vehicles</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <Box>
            <Button 
              component={NavLink} 
              to="/login"
              sx={{
                color: 'text.secondary'
              }}
            >
              Login
            </Button>
          </Box>
        )
        }

        {/* Mobile Bottom Navigation */}
        {isMobile && isLoggedIn && (
          <BottomNavigation
            showLabels
            sx={{
              width: '100%',
              position: 'fixed',
              bottom: 0,
              left: 0,
              zIndex: 1000,
              borderTop: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            {menuItems.map((item) => (
              <BottomNavigationAction
                key={item.name}
                label={item.name}
                icon={item.icon}
                component={NavLink}
                to={item.path}
                sx={{
                  '&.active': {
                    color: '#FF6436', // Active menu color
                  },
                  color: 'text.primary', // Default menu color
                }}
              />
            ))}
          </BottomNavigation>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
