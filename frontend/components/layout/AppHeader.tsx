// frontend/components/layout/AppHeader.tsx
"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function AppHeader() {
  return (
    <header className='md:hidden h-14 border-b border-card-border bg-background text-foreground w-full'>
      <div className='max-w-screen-lg mx-auto px-4 h-full flex items-center justify-between'>
        <Link href='/' className='text-lg font-bold text-accent'>
          Mukimentary
        </Link>

        <div className='flex items-center gap-2 text-sm'>
          <SignedOut>
            <SignInButton mode='modal'>
              <button className='text-sm text-white bg-primary px-3 py-1.5 rounded-md hover:bg-primary/90 transition'>
                ログイン
              </button>
            </SignInButton>
            <SignUpButton mode='modal'>
              <button className='text-sm text-white bg-primary px-3 py-1.5 rounded-md hover:bg-primary/90 transition'>
                新規登録
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl='/' />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
