// components/cheer/mylist/NavigateMyListModal.tsx
// マイリストを選択して遷移するモーダルコンポーネント
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMyLists } from "@/lib/hooks/useMyLists";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function NavigateMyListModal({ open, onOpenChange }: Props) {
  const { myLists, fetchMyLists } = useMyLists();
  const router = useRouter();

  useEffect(() => {
    if (open) fetchMyLists();
  }, [open, fetchMyLists]);

  const handleSelect = (listId: number) => {
    onOpenChange(false);
    router.push(`/my-lists/${listId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>マイリストを選択</DialogTitle>
        </DialogHeader>

        <div className='space-y-2 mt-2'>
          {myLists.length > 0 ? (
            myLists.map((list) => (
              <Button
                key={list.id}
                variant='outline'
                className='w-full justify-start'
                onClick={() => handleSelect(list.id)}
              >
                {list.name}
              </Button>
            ))
          ) : (
            <p className='text-muted-foreground text-sm'>
              マイリストが見つかりません
            </p>
          )}
        </div>
        <div className='mt-4 text-center'>
          <Button
            variant='ghost'
            className='text-sm text-muted-foreground underline hover:text-foreground'
            onClick={() => {
              onOpenChange(false);
              router.push("/my-lists");
            }}
          >
            マイリスト一覧ページへ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
