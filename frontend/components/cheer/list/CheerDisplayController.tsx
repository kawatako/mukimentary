//✅ frontend/components/cheer/list/CheerDisplayController.tsx
// 掛け声の画像表示=状態を制御するコンポーネント

"use client";

import { useState } from "react";
import type { Cheer } from "@/lib/types/cheer";
import CheersList from "./CheersList";
import { Button } from "@/components/ui/button";

type Props = {
  cheers: Cheer[];                  // 掛け声の一覧
  totalPages: number;              // 総ページ数（ページネーション用）
  currentPage: number;            // 現在のページ番号
  onDelete: (id: number) => Promise<void>; // 掛け声削除ハンドラ
};

// 掛け声一覧と、画像の一括表示/非表示切り替えを管理するクライアントコンポーネント
export default function CheerDisplayController({
  cheers,
  totalPages,
  currentPage,
  onDelete,
}: Props) {
  // 画像表示の切り替え状態
  const [showImages, setShowImages] = useState(false);

  return (
    <div className="space-y-4">
      {/* 画像表示切り替えボタン */}
      <div className="text-right">
        <Button
          size="sm"
          variant="outline"
          className="text-sm rounded-lg"
          onClick={() => setShowImages((prev) => !prev)}
        >
          {showImages ? "画像を非表示にする" : "画像をすべて表示"}
        </Button>
      </div>

      {/* 掛け声一覧 */}
      <CheersList
        cheers={cheers}
        totalPages={totalPages}
        currentPage={currentPage}
        onDelete={onDelete}
        showImages={showImages} // ← ここがポイント
      />
    </div>
  );
}
