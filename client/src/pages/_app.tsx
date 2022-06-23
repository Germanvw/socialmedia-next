import type { AppProps } from 'next/app';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { Template } from '../components/elements/sections/Template';
import { customTheme } from '../styles/theme';
import { Provider } from 'react-redux';
import { store } from '../redux/index';
import Head from 'next/head';
import { AuthProvider } from '../components/AuthProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Meet</title>
      </Head>
      <ChakraProvider resetCSS theme={customTheme}>
        <Provider store={store}>
          <ColorModeScript
            initialColorMode={customTheme.config.initialColorMode}
          />
          <AuthProvider>
            <Template component={<Component {...pageProps} />} />
          </AuthProvider>
        </Provider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
