// frontend/components/cheer/CheersList.tsx
"use client";

import { useTransition, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Cheer } from "@/lib/types/cheer";

type Props = {
  cheers: Cheer[];
  onDelete: (id: number) => Promise<void>;
};

export default function CheersList({ cheers, onDelete }: Props) {
  const [isPending, startTransition] = useTransition();
  const [removingId, setRemovingId] = useState<number | null>(null);

  return (
    <div className='space-y-4 w-full max-w-lg mx-auto'>
      {cheers.length === 0 && (
        <div className='text-center text-muted-foreground mt-10 space-y-4'>
          <p>まだ掛け声が登録されていません。</p>
          <p>まずはあなたの筋肉にぴったりの掛け声を作ってみましょう！</p>
          <Link href='/cheers/create'>
            <Button
              variant='default'
              className='bg-primary text-white rounded-xl px-5 py-2 text-base'
            >
              素敵な掛け声を作成する
            </Button>
          </Link>
        </div>
      )}
      {cheers.map((cheer) => (
        <div
          key={cheer.id}
          className='border border-border rounded-xl bg-card p-4 shadow-sm'
        >
          <div className='text-sm text-card-foreground'>
            <span className='font-bold text-primary'>{cheer.text}</span>
            {cheer.cheer_type && <span> [{cheer.cheer_type.name}]</span>}
            {cheer.muscle && <span>（{cheer.muscle.name}）</span>}
            {cheer.pose && <span>・{cheer.pose.name}</span>}
          </div>
          <div className='mt-3 flex justify-between gap-2 flex-wrap'>
            <Link
              href={`/cheers/${cheer.id}/edit`}
              className='flex-1 min-w-[90px]'
            >
              <Button variant='outline' size='sm' className='w-full'>
                編集
              </Button>
            </Link>
            <Button
              variant='destructive'
              size='sm'
              className='flex-1 min-w-[90px]'
              disabled={isPending && removingId === cheer.id}
              onClick={() => {
                if (!window.confirm("本当に削除しますか？")) return;
                setRemovingId(cheer.id);
                startTransition(async () => {
                  await onDelete(cheer.id);
                  setRemovingId(null);
                });
              }}
            >
              {isPending && removingId === cheer.id ? "削除中..." : "削除"}
            </Button>
            <Button
              variant='secondary'
              size='sm'
              className='flex-1 min-w-[90px]'
              onClick={() => {
                window.open(
                  `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `「${cheer.text}」 #ムキメンタリー`
                  )}`,
                  "_blank"
                );
              }}
            >
              シェア
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
