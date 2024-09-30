import Head from 'next/head';
import React, { ReactNode } from 'react';

interface RootLayoutProps {
  title?: string;
  head?: ReactNode;
  children: ReactNode;
  description?: string;
}

function RootLayout({ children, head, title, description }: RootLayoutProps) {
  return (
    <>
      <Head>
        <title>{title || 'Default Title'}</title>
        <meta
          name='description'
          content={description || 'Default Description'}
        />
        {head}
      </Head>
      <div className='h-screen'>{children}</div>
    </>
  );
}

RootLayout.displayName = 'RootLayout';

export { RootLayout };
