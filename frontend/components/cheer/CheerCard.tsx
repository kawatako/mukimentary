//frontend/components/cheer/CheerCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import type { Cheer } from "@/lib/types/cheer";
import { useTransition, useState } from "react";

type Props = {
  cheer: Cheer;
  onDelete: (id: number) => Promise<void>;
};

export function CheerCard({ cheer, onDelete }: Props) {
  const [isPending, startTransition] = useTransition();
  const [removing, setRemoving] = useState(false);

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
      {/* 画像 */}
      {cheer.image_url && (
        <div className='w-full aspect-[4/3] relative rounded-md overflow-hidden border'>
          <Image
            src={cheer.image_url}
            alt='掛け声画像'
            fill
            className='object-contain'
          />
        </div>
      )}

      {/* テキスト情報 */}
      <div className='text-card-foreground text-sm space-y-1'>
        <div className='text-base font-bold'>{cheer.text}</div>
        <div className='text-muted-foreground'>
          {cheer.muscle?.name && <span>{cheer.muscle.name}</span>}
          {cheer.pose?.name && <span>・{cheer.pose.name}</span>}
        </div>
      </div>

      {/* ボタン群 */}
      <div className='flex justify-between gap-2 flex-wrap'>
        <Link href={`/cheers/${cheer.id}/edit`} className='flex-1 min-w-[90px]'>
          <Button variant='outline' size='sm' className='w-full'>
            編集
          </Button>
        </Link>

        <Button
          size='sm'
          className='flex-1 min-w-[90px] bg-red-500 text-white hover:bg-red-600'
          disabled={isPending || removing}
          onClick={handleDelete}
        >
          {isPending || removing ? "削除中..." : "削除"}
        </Button>

        <Button
          variant='outline'
          size='sm'
          className='flex-1 min-w-[90px] flex items-center justify-center gap-1 border-foreground hover:bg-muted'
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
      </div>
    </div>
  );
}
