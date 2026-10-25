import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sample Café Demo — Auckland',
  description: 'Demo site with placeholder content.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NZ">
      <body className="bg-amber-50 text-stone-800 antialiased">{children}</body>
    </html>
  );
}
