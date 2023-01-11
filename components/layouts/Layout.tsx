import Head from 'next/head';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title = 'Pokemon App' }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Adrián Antañón" />
        <meta
          name="description"
          content={`Information about Pokemon ${title}`}
        />
        <meta name="keywords" content={`${title}, Pokemon, pokedex`} />
      </Head>
      <main>{children}</main>
    </>
  );
}
