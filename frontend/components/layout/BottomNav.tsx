// frontend/components/layout/BottomNav.tsx
"use client";

import { Home, Dumbbell, BookOpen, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const navItems = [
  { href: "/cheers", icon: Home, label: "ホーム" },
  { href: "/machogram", icon: Dumbbell, label: "フィード" },
  { href: "/muscle-guide", icon: BookOpen, label: "学ぶ" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useUser();

  const profileHref = user?.username ? `/profile/${user.username}` : "/profile";

  return (
    <nav
      className='fixed bottom-0 left-0 w-full h-14
  bg-primary text-white
  border-t border-[hsl(var(--card-border))]
  shadow-[0_-2px_6px_rgba(0,0,0,0.1)]
  flex justify-around items-center
  md:hidden z-40'
    >
      {" "}
      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center text-xs ${
              isActive
                ? "text-[hsl(var(--accent))] font-semibold"
                : "text-subtext"
            } hover:text-[hsl(var(--accent))] transition-colors`}
          >
            <Icon className='w-5 h-5 mb-0.5' />
            {label}
          </Link>
        );
      })}
      <Link
        href={profileHref}
        className={`flex flex-col items-center text-xs ${
          pathname.startsWith("/profile")
            ? "text-[hsl(var(--accent))] font-semibold"
            : "text-subtext"
        } hover:text-[hsl(var(--accent))] transition-colors`}
      >
        <User className='w-5 h-5 mb-0.5' />
        プロフ
      </Link>
    </nav>
  );
}
