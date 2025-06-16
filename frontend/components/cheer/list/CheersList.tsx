// frontend/components/cheer/list/CheersList.tsx
"use client";

import type { Cheer } from "@/lib/types/cheer";
import { CheerCard } from "./CheerCard";
import Pagination from "@/components/ui/Pagination";
import CheerEmptyState from "./CheerEmptyState";

type Props = {
  cheers: Cheer[];                    // 掛け声の配列
  totalPages: number;                // 総ページ数
  currentPage: number;              // 現在のページ番号
  onDelete: (id: number) => Promise<void>; // 削除ハンドラ
  showImages: boolean;              // 画像を表示するかどうかのフラグ
};

export default function CheersList({
  cheers,
  totalPages,
  currentPage,
  onDelete,
  showImages,
}: Props) {
  // 掛け声が存在しない場合の表示
  if (cheers.length === 0) {
    return <CheerEmptyState />;
  }

  return (
    <div className="space-y-6">
      {/* 掛け声一覧 */}
      <div className="space-y-4 w-full max-w-lg mx-auto">
        {cheers.map((cheer) => (
          <CheerCard
            key={cheer.id}
            cheer={cheer}
            onDelete={onDelete}
            showImage={showImages}
          />
        ))}
      </div>

      {/* ページネーション */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
