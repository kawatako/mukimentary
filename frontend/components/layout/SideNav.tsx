// frontend/components/layout/SideNav.tsx
"use client";

import {
  Home,
  Dumbbell,
  BookOpen,
  User,
  Plus,
  LogIn,
  LogOut,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  useClerk,
  useUser,
} from "@clerk/nextjs";

const navItems = [
  { href: "/cheers", icon: Home, label: "ホーム" },
  { href: "/cheers/create", icon: Plus, label: "作成" },
  { href: "/machogram", icon: Dumbbell, label: "フィード" },
  { href: "/muscle-guide", icon: BookOpen, label: "学ぶ" },
];

export default function SideNav() {
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();

  const profileHref = user?.username ? `/profile/${user.username}` : "/profile";

  return (
    <aside className='hidden md:flex flex-col w-52 h-screen bg-[hsl(var(--background))] px-4 py-6 text-[hsl(var(--foreground))]'>
      <h1 className='text-xl font-bold mb-6 text-[hsl(var(--accent))]'>
        Mukimentary
      </h1>

      {/* ログイン/登録/ログアウト */}
      <div className='mb-4 flex flex-col gap-3 text-sm'>
        <SignedOut>
          <SignInButton mode='modal'>
            <button className='flex items-center gap-3 hover:text-accent transition-colors text-subtext underline underline-offset-2'>
              <LogIn className='w-5 h-5' />
              ログイン
            </button>
          </SignInButton>
          <SignUpButton mode='modal'>
            <button className='flex items-center gap-3 hover:text-accent transition-colors text-subtext underline underline-offset-2'>
              <UserPlus className='w-5 h-5' />
              登録
            </button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <button
            onClick={() => signOut()}
            className='flex items-center gap-3 hover:text-accent transition-colors text-subtext underline underline-offset-2'
          >
            <LogOut className='w-5 h-5' />
            ログアウト
          </button>
        </SignedIn>
      </div>

      {/* メインメニュー */}
      <nav className='flex flex-col gap-3 text-sm'>
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 ${
                isActive
                  ? "text-[hsl(var(--accent))] font-semibold"
                  : "text-subtext"
              } hover:text-[hsl(var(--accent))] transition-colors`}
            >
              <Icon className='w-5 h-5' />
              {label}
            </Link>
          );
        })}

        <Link
          href={profileHref}
          className={`flex items-center gap-3 ${
            pathname.startsWith("/profile")
              ? "text-[hsl(var(--accent))] font-semibold"
              : "text-subtext"
          } hover:text-[hsl(var(--accent))] transition-colors`}
        >
          <User className='w-5 h-5' />
          プロフ
        </Link>
      </nav>
    </aside>
  );
}
