//frontend/components/cheer/ui/ShareForBounusModal.tsx
//ライブラリの中から掛け声を選んでTwitterに投稿するとシェアボーナス+1モーダル
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCheerApi } from "@/lib/hooks/useCheerApi";
import type { Cheer } from "@/lib/types/cheer";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cheers: Cheer[];
  kind: "text_ai" | "image_ai";
  onSuccess: () => void;
}

export function ShareForBonusModal({ open, onOpenChange, cheers, kind, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const { postShareBonus } = useCheerApi();

  const handleShare = async (cheerText: string) => {
    const shareText = `AIがあなたの筋トレを盛り上げる📣\n「${cheerText}」 \n素敵な掛け声を作ってシェアしよう💪 #ムキメンタリー https://mukimentary.com`;

    // シェア先のURLを開く
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, "_blank");

    // シェアボーナス付与
    setLoading(true);
    try {
      await postShareBonus(kind);
      toast.success("AI生成回数が+1回されました!");
      onSuccess();
      onOpenChange(false);
    } catch {
      toast.error("シェアボーナス付与に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>シェアする掛け声を選んでください</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 mt-2">
          {cheers.length > 0 ? (
            cheers.map((cheer) => (
              <Button
                key={cheer.id}
                onClick={() => handleShare(cheer.text)}
                disabled={loading}
                variant="outline"
                className="w-full justify-start"
              >
                {cheer.text}
              </Button>
            ))
          ) : (
            <p className="text-muted-foreground text-sm text-center">掛け声が見つかりません</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
