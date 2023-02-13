import Head from 'next/head';
import { ReactNode } from 'react';
import { Navbar } from '../ui';

interface Props {
  children: ReactNode;
  title?: string;
}

const origin = typeof window === 'undefined' ? '' : window.location.origin;

export default function Layout({ children, title = 'Pokemon App' }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Adrián Antañón" />
        <meta name="keywords" content={`${title}, Pokemon, pokedex`} />
        <meta property="og:title" content={`Info about ${title}`} />
        <meta
          property="og:description"
          content={`This is the page about ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
