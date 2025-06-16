// MyListCheerDisplayController.tsx
//マイリストの掛け声の一覧の画像表示をコントロールする

"use client";

import { useState } from "react";
import type { MyListCheerItem } from "@/lib/types/cheer";
import MyListCheersList from "./MyListCheersList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  cheers: MyListCheerItem[];
  onDelete: (itemId: number) => Promise<void>;
}

export function MyListCheerDisplayController({ cheers, onDelete }: Props) {
  const [showImages, setShowImages] = useState(true);

  return (
    <div className="space-y-4">
      {/* 操作ボタンを横並びで中央寄せ */}
      <div className="flex justify-center items-center gap-3 flex-wrap">
        <Link href="/my-lists">
          <Button variant="outline" size="sm" className="text-sm">
            マイリスト一覧に戻る
          </Button>
        </Link>
        <Button
          size="sm"
          variant="outline"
          className="text-sm rounded-lg"
          onClick={() => setShowImages((prev) => !prev)}
        >
          {showImages ? "画像を非表示にする" : "画像をすべて表示"}
        </Button>
      </div>

      <MyListCheersList
        cheers={cheers}
        onDelete={onDelete}
        showImages={showImages}
      />
    </div>
  );
}
