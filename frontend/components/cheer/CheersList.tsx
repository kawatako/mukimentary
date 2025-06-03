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
    <div className="space-y-4">
      {cheers.length === 0 && <div>掛け声がありません</div>}
      {cheers.map((cheer) => (
        <div key={cheer.id} className="border p-4 rounded shadow">
          <div>
            <span className="font-bold">{cheer.text}</span>
            {cheer.cheer_type && <span> [{cheer.cheer_type.name}]</span>}
            {cheer.muscle && <span>（{cheer.muscle.name}）</span>}
            {cheer.pose && <span>・{cheer.pose.name}</span>}
          </div>
          <div className="mt-2 flex gap-2">
            <Link href={`/cheers/${cheer.id}/edit`}>
              <Button variant="outline" size="sm">編集</Button>
            </Link>
            <Button
              variant="destructive"
              size="sm"
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
              variant="secondary"
              size="sm"
              onClick={() => {
                window.open(
                  `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `「${cheer.text}」 #ムキメンタリー`
                  )}`,
                  "_blank"
                );
                // シェアボーナスAPIは別セグメント
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
