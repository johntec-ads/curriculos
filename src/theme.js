import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF5722',
    },
    secondary: {
      main: '#e3f2fd',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'transform 0.2s ease-in-out',
        },
        containedPrimary: {
          '&:hover': {
            transform: 'scale(1.05)',
          }
        }
      }
    }
  },
});

export default theme;
