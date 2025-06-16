// MyListCheersList.tsx
//マイリスト内の掛け声があれば表示、なければ別の案内が入る
"use client";

import type { MyListCheerItem } from "@/lib/types/cheer";
import { MyListCheerCard } from "./MyListCheerCard";

interface Props {
  cheers: MyListCheerItem[];
  onDelete: (itemId: number) => Promise<void>;
  showImages: boolean;
}

export default function MyListCheersList({ cheers, onDelete, showImages }: Props) {
  if (cheers.length === 0)
  return (
    <div className="text-center text-muted-foreground space-y-4 text-sm max-w-md mx-auto py-10">
      <p className="text-base font-semibold text-foreground">このマイリストはまだ空です</p>
      <p>
        お気に入りの掛け声をこのリストに保存できます。<br />
        「マイリスト」ボタンから追加して、⼤会や発表の前に見返すことができます。
      </p>
      <p>
        掛け声一覧ページに戻って、お気に入りを追加してみましょう！
      </p>
    </div>
  );


  return (
    <div className="space-y-4">
      {cheers.map((cheer) => (
        <MyListCheerCard
          key={cheer.itemId}
          cheer={cheer}
          onDelete={onDelete}
          showImage={showImages}
        />
      ))}
    </div>
  );
}