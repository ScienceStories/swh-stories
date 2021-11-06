import { StylesProvider } from '@material-ui/core';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import PageTitle from '../components/layout/PageTitle';
import routes from '../routes';
import theme from '../theme';
import generateClassName from './generateClassName';
import useStyles from './useStyles';

const App = () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={createTheme(theme)}>
          <PageTitle />
          <div className={classes.root}>
            { routes }
          </div>
        </MuiThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App;
