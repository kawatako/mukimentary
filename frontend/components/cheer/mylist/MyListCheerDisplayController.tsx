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
  listName: string;
}

export function MyListCheerDisplayController({
  cheers,
  onDelete,
  listName,
}: Props) {
  const [showImages, setShowImages] = useState(true);

  const handleCopy = async () => {
    const text = `「${listName}」のマイリスト\n\n${cheers
      .map((cheer, idx) => `${idx + 1}. ${cheer.text}`)
      .join("\n")}`;
    try {
      await navigator.clipboard.writeText(text);
      alert("掛け声を一括コピーしました！");
    } catch {
      alert("コピーに失敗しました");
    }
  };

  return (
    <div className='space-y-4'>
      {/* 操作ボタン群：横並びで中央 */}
      <div className='flex flex-wrap justify-center gap-3'>
        <Link href='/my-lists'>
          <Button variant='outline' size='sm' className='text-sm'>
            マイリスト一覧
          </Button>
        </Link>
        <Button
          size='sm'
          variant='outline'
          className='text-sm'
          onClick={() => setShowImages((prev) => !prev)}
        >
          {showImages ? "画像を非表示にする" : "画像をすべて表示"}
        </Button>
        <Button
          variant='outline'
          size='sm'
          className='text-sm'
          onClick={handleCopy}
        >
          コピー
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
