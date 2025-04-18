import { createTheme } from '@mui/material/styles';


// Color Configuration
const colors = {
  // Brand Colors
  primary: '#FEFEFE',
  secondary: '#ff4081',
  
  // Background Colors
  background: {
    default: '#F4F4F4',
    paper: '#FEFEFE',
  },
  
  // Text Colors
  text: {
    primary: '#191A1F',
    secondary: '#FF6436',
  },
  
  // Button Colors
  button: {
    primary: '#FF6436',
    secondary: '#36a420',
    text: {
      primary: '#191A1F',
      secondary: '#FF6436',
      white: '#FFFFFF'
    },
    border: {
      primary: '#FF6436'
    }
  }
};


// Typography Configuration
const typography = {
  // Font Family
  fontFamily: '"Roboto", "Arial", sans-serif',
  
  // Button Typography
  button: {
    textTransform: 'none',
    fontWeight: 600,
  }
};


// Breakpoints Configuration
const breakpoints = {
  values: {
    xs: 0,    // Mobile
    sm: 600,  // Tablet
    md: 960,  // Small Desktop
    lg: 1280, // Desktop
    xl: 1920, // Large Desktop
  },
};


// Component Overrides
const components = {
  MuiButton: {
    styleOverrides: {
      // Base Button Styles
      root: {
        borderRadius: 10,
        padding: '5px 24px',
      },
      // Outlined Button Specific Styles
      outlined: {
        borderWidth: 1.5,
        '&:hover': {
          borderWidth: 2,
        }
      }
    }
  }
};


// Theme Creation
const theme = createTheme({
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
    background: colors.background,
    text: colors.text,
    button: colors.button,
  },
  typography,
  breakpoints,
  components,
});

export default theme;