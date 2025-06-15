// frontend/components/cheer/list/CheersList.tsx
"use client";

import type { Cheer } from "@/lib/types/cheer";
import { CheerCard } from "./CheerCard";
import Pagination from "@/components/ui/Pagination";
import CheerEmptyState from "./CheerEmptyState";


interface Props {
  cheers: Cheer[];
  totalPages: number;
  currentPage: number;
  onDelete: (id: number) => Promise<void>;
}

export default function CheersList({
  cheers,
  totalPages,
  currentPage,
  onDelete,
}: Props) {
  // 掛け声がない場合の案内
if (cheers.length === 0) {
  return <CheerEmptyState />;
}

  return (
    <div className='space-y-6'>
      {/* 掛け声一覧 */}
      <div className='space-y-4 w-full max-w-lg mx-auto'>
        {cheers.map((cheer) => (
          <CheerCard key={cheer.id} cheer={cheer} onDelete={onDelete} />
        ))}
      </div>

      {/* ページネーション */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
