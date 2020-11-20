import '../styles/globals.scss';
import '../styles/colors.scss';

import { AppProps } from 'next/app';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: green,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
