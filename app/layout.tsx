import type { Metadata } from 'next';
import './globals.css';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: {
    default: 'SHIFT 1.0 | Beyond the Degree',
    template: '%s | SHIFT 1.0',
  },
  description:
    'Connect faith with career growth, personal purpose, and long-term impact at SHIFT 1.0, hosted by WES and the UENR Student Christian Council.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
