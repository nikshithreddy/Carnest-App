
import { createTheme } from '@mui/material/styles';

// Palette Configuration
const palette = {
  primary: {
    main: '#FEFEFE', // Example primary color ()
  },
  secondary: {
    main: '#ff4081', // Example secondary color ()
  },
  background: {
    default: '#F4F4F4', // Background color for the entire app
    paper: '#FEFEFE',   // Background color for cards and paper components
  },
  text: {
    primary: '#191A1F',  // Primary text color
    secondary: '#FF6436', // Secondary text color
  },
  button: {
    primary: '#FF6436',
    secondary: '#36a420'
  }
};


// Typography Configuration
const typography = {
  fontFamily: '"Roboto", "Arial", sans-serif',

};

// Breakpoints Configuration
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

// Create Theme Instance
const theme = createTheme({
  palette,
  typography,
  breakpoints,

});

export default theme;