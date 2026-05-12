import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: "TechKidyy | Modern Website Development",

  description:
    "We design and develop high-quality websites for businesses, startups, portfolios, and online stores with modern UI/UX and responsive performance.",

  keywords: [
    "TechKidyy",
    "website builder",
    "AI website",
    "web development",
    "portfolio website",
    "ecommerce website",
    "SaaS platform",
    "React website",
    "Next.js development",
  ],

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  openGraph: {
    title: "TechKidyy — Professional Website Development Platform",

    description:
      "Create stunning, modern, and responsive websites for businesses, startups, portfolios, and online stores.",

    url: "https://techkidyy.com",

    siteName: "TechKidyy",

    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "TechKidyy Logo",
      },
    ],

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TechKidyy",
    description:
      "Modern website development and AI-powered digital solutions.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(15, 23, 42, 0.95)',
              color: '#e2e8f0',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              backdropFilter: 'blur(12px)',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#10b981', secondary: '#022c22' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#450a0a' } },
          }}
        />
      </body>
    </html>
  );
}