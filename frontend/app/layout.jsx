import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  metadataBase: new URL("https://techkidyy-sigma.vercel.app"),

  alternates: {
  canonical: "https://techkidyy-sigma.vercel.app",
},

  title: {
    default: "TechKidyy | Modern Website Development",
    template: "%s | TechKidyy",
  },

  description:
  "TechKidyy builds modern websites, AI solutions, ecommerce platforms, dashboards, and responsive digital experiences for businesses and creators.",

  keywords: [
    "TechKidyy",
    "website development",
    "AI website",
    "web development",
    "portfolio website",
    "Next.js developer",
    "React developer",
    "modern websites",
    "responsive websites",
    "UI UX design",
    "dashboard development",
    "ecommerce website",
    "frontend developer",
    "digital solutions",
    "SEO services",
    "AI automation",
    "web design company",
    "Next.js website",
    "business website development",
    "frontend development",
    "digital branding",
    "professional portfolio website",
  ],
  
  verification: { google: "Gc8LlbP0tWas1dSephZmbTPSYnzLSGnG0vgpXNf6nd4", },

  authors: [{ name: "TechKidyy" }],

  creator: "TechKidyy",

  publisher: "TechKidyy",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "TechKidyy | Modern Website Development",

    description:
      "Modern websites, AI-powered applications, dashboards, ecommerce platforms, and professional digital solutions.",

    url: "https://techkidyy-sigma.vercel.app",

    siteName: "TechKidyy",

    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "TechKidyy",
      },
    ],

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "TechKidyy | Modern Website Development",

    description:
      "Modern websites and AI-powered digital solutions for startups and businesses.",

    images: ["/favicon.ico"],

    creator: "@techkidyy",
  },

  category: "technology",
  icons: {
  icon: "/favicon.ico",
  shortcut: "/favicon.ico",
  apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "TechKidyy",
              url: "https://techkidyy-sigma.vercel.app",
              logo: "https://techkidyy-sigma.vercel.app/logo.png",
              description:
                "TechKidyy provides modern website development and AI-powered digital solutions.",
              sameAs: [
                "https://instagram.com/techkidyy",
                "https://linkedin.com/company/techkidyy",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "TechKidyy",
              image: "https://techkidyy-sigma.vercel.app/logo.png",
              url: "https://techkidyy-sigma.vercel.app",
              telephone: "+91 12345 67890",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
            }),
          }}
        />
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
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9M73WJBZC9"></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9M73WJBZC9');
            `,
          }}
        />
      </body>
    </html>
  );
}