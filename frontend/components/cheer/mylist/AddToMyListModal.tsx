//frontend/components/cheer/mylist/AddToMyListModal.tsx
//マイリストを選択して掛け声を追加できる、その場で新しいマイリストも作成可能

"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMyLists } from "@/lib/hooks/useMyLists";

type Props = {
  cheerId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AddToMyListModal({ cheerId, open, onOpenChange }: Props) {
  const {
    myLists,
    error,
    fetchMyLists,
    createMyList,
    addCheerToList,
  } = useMyLists();

  const [newListName, setNewListName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // モーダル表示時にマイリスト一覧を取得
  useEffect(() => {
    if (open) {
      fetchMyLists();
    }
  }, [open, fetchMyLists]);

  const handleAddToExistingList = async (listId: number) => {
    setIsSubmitting(true);
    const success = await addCheerToList(listId, cheerId);
    if (success) onOpenChange(false);
    setIsSubmitting(false);
  };

  const handleCreateListAndAdd = async () => {
    if (!newListName.trim()) return;
    setIsSubmitting(true);
    const newList = await createMyList(newListName.trim());
    if (newList) {
      await addCheerToList(newList.id, cheerId);
      onOpenChange(false);
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>マイリストに追加</DialogTitle>
          <DialogDescription>
            掛け声を保存するリストを選ぶか、新しく作成してください。
          </DialogDescription>
        </DialogHeader>

        {/* 既存のリストから選ぶ */}
        <div className="space-y-2">
          {myLists.length > 0 ? (
            myLists.map((list) => (
              <Button
                key={list.id}
                variant="outline"
                className="w-full justify-start"
                disabled={isSubmitting}
                onClick={() => handleAddToExistingList(list.id)}
              >
                {list.name}
              </Button>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">マイリストが見つかりません</p>
          )}
        </div>

        {/* 新しく作る */}
        <div className="mt-4 space-y-2">
          <Input
            placeholder="新しいリスト名を入力"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            disabled={isSubmitting}
          />
          <Button
            onClick={handleCreateListAndAdd}
            className="w-full"
            disabled={isSubmitting}
          >
            作成して追加
          </Button>
        </div>

        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </DialogContent>
    </Dialog>
  );
}
