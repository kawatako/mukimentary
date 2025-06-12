// frontend/app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import { jaJP } from "@clerk/localizations";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Script from "next/script";
import SideNav from "@/components/layout/SideNav";
import BottomNav from "@/components/layout/BottomNav";
import { FloatingCreateButton } from "@/components/cheer/FloatingCreateButton";
import AppHeader from "@/components/layout/AppHeader";

export const metadata: Metadata = {
  title: "ムキメンタリー",
  description: "筋肉と掛け声のSNS",
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
    >
      <html lang='ja'>
        <head>
          <Script
            async
            src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
            strategy='afterInteractive'
            crossOrigin='anonymous'
          />
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
              </main>
            </div>
          </div>
          <BottomNav />
          <FloatingCreateButton />
          <Toaster richColors closeButton position='top-center' />
        </body>
      </html>
    </ClerkProvider>
  );
}
