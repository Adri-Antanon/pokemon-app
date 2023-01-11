import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import '../styles/globals.css';
import { lightTheme, darkTheme } from '../themes';

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <NextThemesProvider
    //   defaultTheme="system"
    //   attribute="class"
    //   value={{
    //     light: lightTheme.className,
    //     dark: darkTheme.className,
    //   }}
    // >
    <NextUIProvider theme={darkTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
    // </NextThemesProvider>
  );
}
