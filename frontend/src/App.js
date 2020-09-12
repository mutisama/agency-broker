import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { colors } from './styles/colors';
import { Routes } from './routes/Routes';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
  },
});

function App() {
  return (
    <Router>
      <MuiThemeProvider theme={theme}></MuiThemeProvider>
      <Routes />
    </Router>
  );
}

export default App;
