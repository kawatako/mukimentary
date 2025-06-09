//ftontend/components/cheer/FloatingCreateButton.tsx

"use client";

import { useRouter, usePathname } from "next/navigation";
import { PlusIcon } from "lucide-react";

export function FloatingCreateButton() {
  const router = useRouter();
  const pathname = usePathname();

  // cheersページ以外では表示しない
  if (pathname !== "/cheers") return null;

  return (
    <button
      onClick={() => router.push("/cheers/create")}
      className="fixed bottom-20 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition md:hidden"
      aria-label="掛け声を作成"
    >
      <PlusIcon className="w-6 h-6" />
    </button>
  );
}

