//frontend/components/layout/SideNav.tsx
"use client";

import { Home, Dumbbell, BookOpen, User, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const navItems = [
  { href: "/cheers", icon: Home, label: "ホーム" },
  { href: "/cheers/create", icon: Plus, label: "作成" }, // ← 追加
  { href: "/machogram", icon: Dumbbell, label: "フィード" },
  { href: "/muscle-guide", icon: BookOpen, label: "学ぶ" },
];

export default function SideNav() {
  const pathname = usePathname();
  const { user } = useUser();

  const profileHref = user?.username
    ? `/profile/${user.username}`
    : "/profile";

  return (
    <aside className="hidden md:flex flex-col w-52 h-screen fixed top-0 left-0 border-r bg-white px-4 py-6 z-30">
      <h1 className="text-xl font-bold mb-8">ムキメンタリー</h1>

      <nav className="flex flex-col gap-4">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 text-sm ${
                isActive ? "text-primary font-semibold" : "text-muted-foreground"
              } hover:text-primary transition-colors`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          );
        })}

        <Link
          href={profileHref}
          className={`flex items-center gap-3 text-sm ${
            pathname.startsWith("/profile")
              ? "text-primary font-semibold"
              : "text-muted-foreground"
          } hover:text-primary transition-colors`}
        >
          <User className="w-5 h-5" />
          プロフ
        </Link>
      </nav>
    </aside>
  );
}
