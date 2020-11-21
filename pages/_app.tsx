import '../styles/globals.scss';
import '../styles/colors.scss';

import { AppProps } from 'next/app';
import orange from '@material-ui/core/colors/orange';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: {
      main: '#000',
    },
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
