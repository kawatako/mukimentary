// components/muscle-guide/TabSwitcher.tsx
"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PoseList } from "./PoseList";
import { MuscleList } from "./MuscleList";

export function TabSwitcher() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const tab = searchParams.get("tab") === "muscle" ? "muscle" : "pose";

  const handleChange = (nextTab: "pose" | "muscle") => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("tab", nextTab);
    router.replace(`${pathname}?${newParams.toString()}`);
  };

  return (
    <>
      <div className="flex w-full border-b border-border">
        <button
          className={cn(
            "flex-1 px-4 py-2 text-sm font-medium border-b-2 transition",
            tab === "pose"
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
            tab === "muscle"
              ? "text-primary border-primary"
              : "text-muted-foreground border-transparent"
          )}
          onClick={() => handleChange("muscle")}
        >
          筋肉ガイド
        </button>
      </div>

      <div className="mt-4">
        {tab === "pose" ? <PoseList /> : <MuscleList />}
      </div>
    </>
  );
}
