import './globals.css';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyBar from '@/components/StickyBar';

export const metadata = {
  metadataBase: new URL('https://www.protech.co.ke'),
  title: {
    default: 'Kenya Multi-Service Consultancy | Construction, Solar, Plumbing & More',
    template: '%s | ProTech Consulting',
  },
  description: 'Leading multi-service consultancy in Kenya. Construction, Solar, Plumbing, Security, Borehole Drilling & 15+ services. Get a free quote today.',
  keywords: ['Kenya consultancy', 'construction services Kenya', 'solar installation Kenya', 'plumbing services Nairobi', 'borehole drilling Kenya', 'security systems Kenya'],
  authors: [{ name: 'ProTech Consulting' }],
  creator: 'ProTech Consulting',
  publisher: 'ProTech Consulting',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://www.protech.co.ke',
    siteName: 'ProTech Consulting',
    title: 'Kenya Multi-Service Consultancy | 17+ Services Nationwide',
    description: 'Leading multi-service consultancy in Kenya. Construction, Solar, Plumbing, Security, Borehole Drilling & more. Get a free quote today.',
    images: [
      {
        url: 'https://www.protech.co.ke/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ProTech Consulting - Multi-Service Provider',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kenya Multi-Service Consultancy | 17+ Services Nationwide',
    description: 'Leading multi-service consultancy in Kenya. Construction, Solar, Plumbing, Security, Borehole Drilling & more.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google.com" />
        <meta name="theme-color" content="#102a43" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <StickyBar />
      </body>
    </html>
  );
}