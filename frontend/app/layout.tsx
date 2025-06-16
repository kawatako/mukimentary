// frontend/app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerk/appearance";
import { jaJP } from "@clerk/localizations";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Script from "next/script";
import SideNav from "@/components/layout/SideNav";
import BottomNav from "@/components/layout/BottomNav";
import AppHeader from "@/components/layout/AppHeader";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "ムキメンタリー",
  description: "筋肉と掛け声のSNS",
  themeColor: "#ff6b81",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      localization={jaJP}
      signInUrl='/sign-in'
      signUpUrl='/sign-up'
      appearance={clerkAppearance}
    >
      <html lang='ja'>
        <head>
          {/* Google Site Verification */}
          <meta
            name='google-site-verification'
            content='1tM9HQU6ncmTSg0mciFZ0F3dCBBkUTLvdrZNbGXagYE'
          />

          {/* Google AdSense */}
          <Script
            async
            src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9614537995335790'
            strategy='afterInteractive'
            crossOrigin='anonymous'
          />

          {/* Google tag (gtag.js) */}
          <Script
            strategy='afterInteractive'
            src='https://www.googletagmanager.com/gtag/js?id=G-0JLW7EWBJD'
          />
          <Script id='gtag-init' strategy='afterInteractive'>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-0JLW7EWBJD');
            `}
          </Script>

          <link rel='manifest' href='/manifest.webmanifest' />
          <meta name='theme-color' content='#ff6b81' />
        </head>
        <body>
          <div className='flex w-full justify-center'>
            <div className='flex w-full max-w-screen-md min-h-screen gap-0'>
              <aside className='hidden md:block w-52 shrink-0'>
                <SideNav />
              </aside>
              <main className='flex-1'>
                <AppHeader />
                {children}
                <Footer />
              </main>
            </div>
          </div>
          <BottomNav />
          <Toaster richColors closeButton position='top-center' />
        </body>
      </html>
    </ClerkProvider>
  );
}
