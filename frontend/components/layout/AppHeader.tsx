// frontend/components/layout/AppHeader.tsx
"use client";

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="md:hidden h-14 border-b border-card-border bg-background text-foreground w-full">
      <div className="max-w-screen-lg mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-accent">
          Mukimentary
        </Link>

        <div className="space-x-2">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm text-subtext hover:text-accent transition">
                ログイン
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="text-sm text-subtext hover:text-accent transition">
                新規登録
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

