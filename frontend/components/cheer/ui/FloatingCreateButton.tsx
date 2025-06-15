//ftontend/components/cheer/ui/FloatingCreateButton.tsx

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
      className="fixed bottom-20 right-6 z-50 bg-primary text-white px-4 py-3 rounded-full shadow-lg hover:bg-primary/90 transition md:hidden flex flex-col items-center text-xs font-medium"
      aria-label="掛け声を作成"
    >
      <PlusIcon className="w-5 h-5 mb-1" />
      掛け声作成
    </button>
  );
}
