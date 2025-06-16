//components/cheer/ui/ShareModal.tsx
//作成した掛け声をクリップボードにコピーorXにシェア
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

type Props = {
  cheerText: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ShareModal({ cheerText, open, onOpenChange }: Props) {
  const shareText = `AIがあなたの筋トレを盛り上げる📣
「${cheerText}」 素敵な掛け声を作ってシェアしよう💪#ムキメンタリー https://mukimentary.com`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cheerText);
      toast.success("掛け声をコピーしました！");
    } catch {
      toast.error("コピーに失敗しました");
    }
  };

  const handleShareToX = () => {
    const encoded = encodeURIComponent(shareText);
    window.open(`https://twitter.com/intent/tweet?text=${encoded}`, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>掛け声をシェア</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Button onClick={handleShareToX} className="w-full">
            Xにシェアする
          </Button>
          <Button variant="outline" onClick={handleCopy} className="w-full flex gap-2 justify-center items-center">
            <Copy size={16} />
            テキストをコピーする
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
