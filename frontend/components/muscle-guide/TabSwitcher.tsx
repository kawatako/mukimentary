// components/muscle-guide/TabSwitcher.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  activeTab: "pose" | "muscle";
};

export function TabSwitcher({ activeTab }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (tab: "pose" | "muscle") => {
    router.replace(`${pathname}?tab=${tab}`);
  };

  return (
    <div className="flex w-full border-b border-border">
      <button
        className={cn(
          "flex-1 px-4 py-2 text-sm font-medium border-b-2 transition",
          activeTab === "pose"
            ? "text-primary border-primary"
            : "text-muted-foreground border-transparent"
        )}
        onClick={() => handleChange("pose")}
      >
        ポーズ一覧
      </button>
      <button
        className={cn(
          "flex-1 px-4 py-2 text-sm font-medium border-b-2 transition",
          activeTab === "muscle"
            ? "text-primary border-primary"
            : "text-muted-foreground border-transparent"
        )}
        onClick={() => handleChange("muscle")}
      >
        筋肉ガイド
      </button>
    </div>
  );
}
