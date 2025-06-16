// frontend/components/cheer/mylist/MyListCheerCard.tsx
// マイリスト内の掛け声カードコンポーネント
"use client";

import type { MyListCheerItem } from "@/lib/types/cheer";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useState, useTransition } from "react";

type Props = {
  cheer: MyListCheerItem;
  onDelete: (itemId: number) => Promise<void>;
  showImage?: boolean;
};

export function MyListCheerCard({ cheer, onDelete, showImage = true }: Props) {
  const [isPending, startTransition] = useTransition();
  const [removing, setRemoving] = useState(false);

  const handleDelete = () => {
    if (!window.confirm("このリストから削除しますか？")) return;
    setRemoving(true);
    startTransition(async () => {
      await onDelete(cheer.itemId);
      setRemoving(false);
    });
  };

  return (
    <div className="border border-border rounded-xl bg-card p-4 shadow-sm space-y-3">
      {/* 画像表示 */}
      {showImage && cheer.image_url && (
        <div className="w-full aspect-[4/3] relative rounded-md overflow-hidden border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cheer.image_url}
            alt="掛け声画像"
            className="w-full h-full object-contain absolute inset-0"
          />
        </div>
      )}

      {/* 掛け声テキストと説明 */}
      <div className="text-card-foreground space-y-1">
        <div className="text-lg font-bold tracking-tight leading-snug">
          {cheer.text}
        </div>
      </div>

      {/* アクションボタン */}
      <div className="flex justify-between gap-2 flex-wrap">
        <Button
          size="sm"
          className="flex-1 min-w-[90px] bg-red-500 text-white hover:bg-red-600"
          disabled={isPending || removing}
          onClick={handleDelete}
        >
          {isPending || removing ? "削除中..." : "削除"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="flex-1 min-w-[90px] flex items-center justify-center gap-1 border-foreground hover:bg-muted"
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `「${cheer.text}」 #ムキメンタリー`
              )}`,
              "_blank"
            )
          }
        >
          <Share2 size={16} /> シェア
        </Button>
      </div>
    </div>
  );
}
