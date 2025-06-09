//frontend/components/layout/BottomNav.tsx
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

  // プロフィールリンク（ログインしていればユーザーネームを使用）
  const profileHref = user?.username
    ? `/profile/${user.username}`
    : "/profile"; // fallback

  return (
    <nav className="fixed bottom-0 left-0 w-full h-14 bg-white border-t border-gray-200 flex justify-around items-center md:hidden z-40">
      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center text-xs ${
              isActive ? "text-primary font-semibold" : "text-muted-foreground"
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            {label}
          </Link>
        );
      })}

      <Link
        href={profileHref}
        className={`flex flex-col items-center text-xs ${
          pathname.startsWith("/profile") ? "text-primary font-semibold" : "text-muted-foreground"
        }`}
      >
        <User className="w-5 h-5 mb-0.5" />
        プロフ
      </Link>
    </nav>
  );
}
