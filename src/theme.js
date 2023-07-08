import { createTheme } from '@mui/material/styles';
import * as colors from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    background: {
      default: colors.brown['A100'],
    },
    primary: {
      main: colors.brown['900'],
    },
    secondary: {
      main: colors.brown['700'],
    },
    error: {
      main: colors.red['A400'],
    },
  },
});

export default theme;
