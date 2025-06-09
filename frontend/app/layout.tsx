// frontend/app/layout.tsx
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Script from "next/script";
import SideNav from "@/components/layout/SideNav";
import BottomNav from "@/components/layout/BottomNav";
import { FloatingCreateButton } from "@/components/cheer/FloatingCreateButton";

export const metadata: Metadata = {
  title: "ムキメンタリー",
  description: "筋肉と掛け声のSNS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="ja">
        <head>
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        </head>
        <body className="bg-background text-foreground">
          {/* 左サイドナビ（PC） */}
          <SideNav />

          <main className="min-h-screen md:ml-52">
            {/* グローバルヘッダー（ログインボタンなど） */}
            <header className="p-4 border-b flex justify-end items-center">
              <SignedOut>
                <div className="space-x-2">
                  <SignInButton />
                  <SignUpButton />
                </div>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>

            {/* ページ内容 */}
            {children}
          </main>

          {/* フッターナビ（スマホ） */}
          <BottomNav />

          {/* スマホ＋cheers専用作成ボタン */}
          <FloatingCreateButton />

          {/* 通知 */}
          <Toaster richColors closeButton position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
