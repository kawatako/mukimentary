// frontend/components/cheer/CheersList.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Cheer } from "@/lib/types/cheer";
import { CheerCard } from "./CheerCard";
import Pagination from "@/components/ui/Pagination";

interface Props {
  cheers: Cheer[];
  totalPages: number;
  currentPage: number;
  onDelete: (id: number) => Promise<void>;
}

export default function CheersList({ cheers, totalPages, currentPage, onDelete }: Props) {

  if (cheers.length === 0) {
    return (
      <div className="text-center text-muted-foreground mt-10 space-y-4">
        <p>まだ掛け声が登録されていません。</p>
        <p>まずはあなたの筋肉にぴったりの掛け声を作ってみましょう！</p>
        <Link href="/cheers/create">
          <Button variant="default" className="rounded-xl px-5 py-2 text-base">
            素敵な掛け声を作成する
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 掛け声一覧 */}
      <div className="space-y-4 w-full max-w-lg mx-auto">
        {cheers.map((cheer) => (
          <CheerCard key={cheer.id} cheer={cheer} onDelete={onDelete} />
        ))}
      </div>

      {/* ページネーション */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
