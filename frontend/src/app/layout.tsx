// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from '@/components/AuthProvider';
// import ClientThemeProvider from '@/components/ClientThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Application',
  description: 'My awesome app built with Next.js 14',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {/* <ClientThemeProvider> */}
          <AuthProvider>
            {children}
            <ToastContainer />
          </AuthProvider>
        {/* </ClientThemeProvider> */}
      </body>
    </html>
  );
}