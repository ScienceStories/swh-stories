import { grey } from '@mui/material/colors';

import { Color } from '../constants';

const theme = {
  palette: {
    primary: {
      main: Color.Red,
    },
    secondary: {
      main: Color.Yellow,
    },
    text: {
      primary: grey[800],
      secondary: grey[600],
    },
  },
  typography: {
    fontFamily: 'Alegreya Sans, system-ui, -apple-system, Segoe UI, sans-serif',
    finePrint: {
      color: grey[600],
      fontStyle: 'italic',
      fontSize: 10,
      fontWeight: 400,
    },
    h1: {
      fontFamily: 'Alegreya',
    },
    h2: {
      fontFamily: 'Alegreya',
    },
    h3: {
      fontFamily: 'Alegreya',
    },
    overline: {
      fontFamily: 'Alegreya',
    },
  },
};

export default theme;
