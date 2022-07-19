import React from 'react';
import ReactDOM from 'react-dom/client';
import 'modern-normalize';
import { ToastContainer } from 'react-toastify';
import { Global, ThemeProvider } from '@emotion/react';
import { GlobalStyles, theme } from 'styles';
import { App } from 'components';
import { Grid } from 'components/Grid/Grid.styled';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyles} />
      <ToastContainer autoClose={2500} />
      <Grid>
        <App />
      </Grid>
    </ThemeProvider>
  </React.StrictMode>
);
