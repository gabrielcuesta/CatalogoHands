import '../styles/globals.scss';
import '../styles/colors.scss';
import Head from 'next/head';
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
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Amigos, diversão e Boardgames" />
        <meta name="keywords" content="Hands, Games, BoardGames" />
        <title>Hands Board Games</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="icons/icon-42x42.png"
          rel="icon"
          type="image/png"
          sizes="42x42"
        />
        <link
          href="/icons/icon-192x192.png"
          rel="icon"
          type="image/png"
          sizes="192x192"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <link rel="icon" href="/icon.png" />
        <link
          rel="preload"
          as="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <meta name="theme-color" content="#1b0804" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
