import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from './lib/theme-context';
import { UserProvider } from './lib/user-context';

export const metadata: Metadata = {
  title: 'Smart Assetz',
  description: 'Nigeria\'s Premium Property & Partner Ecosystem',
  applicationName: 'Smart Assetz',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b0610',
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[var(--brand-dark,#0b0610)] text-[#f4eff8] antialiased">
        <ThemeProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
