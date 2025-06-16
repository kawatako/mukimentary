//frontend/components/cheer/list/CheerDisplayController.tsx
// 掛け声の画像表示=状態とマイリスト一覧モーダルの開閉を制御するコンポーネント

"use client";

import { useState, } from "react";
import type { Cheer } from "@/lib/types/cheer";
import CheersList from "./CheersList";
import { Button } from "@/components/ui/button";
import NavigateMyListModal from "@/components/cheer/mylist/NavigateMyListModal";

type Props = {
  cheers: Cheer[];                  // 掛け声の一覧
  totalPages: number;              // 総ページ数（ページネーション用）
  currentPage: number;            // 現在のページ番号
  onDelete: (id: number) => Promise<void>; // 掛け声削除ハンドラ
};

export default function CheerDisplayController({
  cheers,
  totalPages,
  currentPage,
  onDelete,
}: Props) {
  //画像一括表示ボタンの開閉
  const [showImages, setShowImages] = useState(false);
  //マイリスト一覧もーだるの開閉
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* 操作ボタン：中央寄せ＋並列表示（スマホ対応） */}
      <div className="flex justify-center items-center gap-3 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          className="text-sm"
          onClick={() => setModalOpen(true)}
        >
          マイリスト一覧
        </Button>
      {/* モーダル本体（選択で遷移） */}
      <NavigateMyListModal open={modalOpen} onOpenChange={setModalOpen} />

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
        showImages={showImages}
      />
    </div>
  );
}
