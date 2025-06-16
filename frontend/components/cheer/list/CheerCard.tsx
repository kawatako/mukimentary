//frontend/components/cheer/list/CheerCard.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Share2, Plus } from "lucide-react";
import type { Cheer } from "@/lib/types/cheer";
import { useTransition, useState } from "react";
import AddToMyListModal from "@/components/cheer/mylist/AddToMyListModal";

type Props = {
  cheer: Cheer; // 掛け声の情報
  onDelete: (id: number) => Promise<void>; // 削除ハンドラ
  showImage: boolean; // このカードで画像を表示するかどうか
};

export function CheerCard({ cheer, onDelete, showImage }: Props) {
  const [isPending, startTransition] = useTransition();
  const [removing, setRemoving] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = () => {
    if (!window.confirm("本当に削除しますか？")) return;
    setRemoving(true);
    startTransition(async () => {
      await onDelete(cheer.id);
      setRemoving(false);
    });
  };

  return (
    <div className='border border-border rounded-xl bg-card p-4 shadow-sm space-y-3'>
      {/* 画像表示 */}
      {showImage && cheer.image_url && (
        <div className='w-full aspect-[4/3] relative rounded-md overflow-hidden border'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cheer.image_url}
            alt='掛け声画像'
            className='w-full h-full object-contain absolute inset-0'
          />
        </div>
      )}

      {/* 掛け声テキストと説明 */}
      <div className='text-card-foreground text-sm space-y-1'>
        <div className='text-base font-bold'>{cheer.text}</div>
        <div className='text-muted-foreground'>
          {cheer.muscle?.name && <span>{cheer.muscle.name}</span>}
          {cheer.pose?.name && <span>・{cheer.pose.name}</span>}
        </div>
      </div>

      {/* アクションボタン */}
      <div className='grid grid-cols-2 gap-2 sm:flex sm:justify-between sm:flex-wrap'>
        <Link href={`/cheers/${cheer.id}/edit`}>
          <Button variant='outline' size='sm' className='w-full min-w-[90px]'>
            編集
          </Button>
        </Link>

        <Button
          size='sm'
          className='w-full min-w-[90px] bg-red-500 text-white hover:bg-red-600'
          disabled={isPending || removing}
          onClick={handleDelete}
        >
          {isPending || removing ? "削除中..." : "削除"}
        </Button>

        <Button
          variant='outline'
          size='sm'
            className="w-full min-w-[90px] flex items-center justify-center gap-1 hover:bg-muted"
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `「${cheer.text}」 #ムキメンタリー`
              )}`,
              "_blank"
            )
          }
        >
          <Share2 size={16} />
          シェア
        </Button>

        <Button
          variant='secondary'
          size='sm'
          className='w-full min-w-[90px] flex items-center justify-center gap-1 border border-gray-300'
          onClick={() => setOpenModal(true)}
        >
          <Plus size={16} />
          マイリスト
        </Button>
      </div>

      {/* モーダル表示 */}
      <AddToMyListModal
        cheerId={cheer.id}
        open={openModal}
        onOpenChange={setOpenModal}
      />
    </div>
  );
}
