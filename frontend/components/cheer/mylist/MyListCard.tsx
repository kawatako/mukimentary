// frontend/components/cheer/mylist/MyListCard.tsx
//マイリストのカードコンポーネント
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { MyList } from "@/lib/types/cheer";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { useMyListUpdater } from "@/lib/hooks/useMyListUpdater";

type Props = {
  list: MyList;
  onDelete: (id: number) => void;
};

export function MyListCard({ list, onDelete }: Props) {
  const router = useRouter();
  const { updateMyListName } = useMyListUpdater();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(list.name);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (name.trim() === "" || name === list.name) {
      setEditing(false);
      return;
    }
    setLoading(true);
    try {
      await updateMyListName(list.id, name);
      router.refresh(); // マイリスト一覧の再取得
    } catch (e) {
      console.error("マイリスト更新エラー:", e);
      alert("更新に失敗しました");
    } finally {
      setEditing(false);
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-between border p-4 rounded-xl shadow-sm bg-white'>
      <div className='flex-1'>
        {editing ? (
          <div className='flex items-center gap-2'>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='border rounded px-2 py-1 text-sm w-full'
              autoFocus
            />
            <button onClick={handleUpdate} disabled={loading}>
              <Check className='text-green-600' size={18} />
            </button>
            <button
              onClick={() => {
                setName(list.name);
                setEditing(false);
              }}
            >
              <X className='text-gray-500' size={18} />
            </button>
          </div>
        ) : (
          <div
            className='cursor-pointer'
            onClick={() => router.push(`/my-lists/${list.id}`)}
          >
            <h3 className='text-base font-semibold text-foreground'>
              {list.name}
            </h3>
          </div>
        )}
      </div>

      {!editing && (
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='icon'
            onClick={() => setEditing(true)}
          >
            <Pencil size={16} />
          </Button>
          <Button
            size='icon'
            className='bg-red-600 hover:bg-red-700 text-white rounded-full'
            onClick={() => {
              if (confirm(`「${list.name}」を削除しますか？`)) {
                onDelete(list.id);
              }
            }}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      )}
    </div>
  );
}
