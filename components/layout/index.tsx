/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Head from 'next/head';
import { Header, Footer } from '../';

type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  const [isMobileMenuCollapsed, setIsMobileMenuCollapsed] = useState(false);

  return (
    <>
      <Head>
        <title>Monika Whatsapp Notifier</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="A service to send you Whatsapp messages when your website is down"
        />
        <meta
          name="keywords"
          content="whatsapp,notifier,monitoring,devops,synthetic,open source,free tool"
        />
        <meta
          name="app:version"
          content={process.env.NEXT_PUBLIC_APP_VERSION}
        />
      </Head>
      <Header
        isMobileMenuCollapsed={isMobileMenuCollapsed}
        onMobileMenuCollapsedChange={setIsMobileMenuCollapsed}
      />
      <Content>{children}</Content>
      <Footer />
    </>
  );
}

function Content({ children }: LayoutProps): JSX.Element {
  return (
    <main className="flex flex-col w-full py-5 text-white bg-monika-black">
      <div className="container z-10 px-8 py-4 mx-auto sm:px-6 lg:px-16 md:p-8 lg:p-16">
        {children}
      </div>
      <div className="z-0 mt-0 lg:-mt-32">
        <img
          src="/assets/wave-monika.svg"
          className="object-fill w-screen"
          alt="Monika Wave"
        />
        <div
          style={{ height: '2px', marginTop: '2px' }}
          className="bg-gradient-to-r from-monika-purple to-monika-aqua"
        />
      </div>
    </main>
  );
}
