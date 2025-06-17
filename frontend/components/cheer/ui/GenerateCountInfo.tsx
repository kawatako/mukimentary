// frontend/components/cheer/ui/GenerateCountInfo.tsx
// 回数表示＆シェアボタンUIコンポーネント
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCheerApi } from "@/lib/hooks/useCheerApi";
import { toast } from "sonner";
import { Cheer } from "@/lib/types/cheer";
import { ShareForBonusModal } from "./ShareForBonusModal";

type Props = {
  kind: "text_ai" | "image_ai";
  onChangeRemaining?: (v: number) => void;
  cheerSamples: Cheer[];
};

type LimitResponse = {
  remaining: number;
  can_share: boolean;
};

export function GenerateCountInfo({ kind, onChangeRemaining, cheerSamples }: Props) {
  const [remaining, setRemaining] = useState<number | null>(null);
  const [canShare, setCanShare] = useState(false);
  const [loading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { getAiLimit, postShareBonus } = useCheerApi();

  // 生成可能回数取得
  const fetchLimit = async () => {
    try {
      const data: LimitResponse = await getAiLimit(kind);
      setRemaining(data.remaining);
      setCanShare(data.can_share);
      onChangeRemaining?.(data.remaining);
    } catch {
      toast.error("回数残数の取得に失敗しました");
      onChangeRemaining?.(0);
    }
  };

  useEffect(() => {
    fetchLimit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind]);

const handleBonusGranted = async () => {
  try {
    // 現在の残り回数を保存（後で比較用）
    const before = remaining;
    // API経由でシェアボーナスを申請（+1回を付与）
    await postShareBonus(kind);
    // 状態更新のために再取得（setState内で更新される）
    await fetchLimit();
    // 正確な比較のために、もう一度最新の回数情報を取得
    const after = await getAiLimit(kind);
    // ボーナスによる差分を計算
    const diff = after.remaining - (before ?? 0);
    // 差分があれば成功メッセージ、なければ注意メッセージ
    if (diff > 0) {
      toast.success(`AI生成回数が+${diff}回されました!`);
    } else {
      toast.info("AI生成回数は変わりませんでした");
    }
    // 状態を明示的に更新（親コンポーネント連携用）
    setRemaining(after.remaining);
    setCanShare(after.can_share);
    onChangeRemaining?.(after.remaining);

  } catch (err) {
    // catch は postShareBonus() が本当に失敗したときだけ処理する
    if (
      err instanceof Error &&
      err.message.includes("本日のシェアボーナスはすでに付与されています")
    ) {
    } else {
      toast.error("シェアボーナス付与に失敗しました、しばらく経ってからお試しください");
    }
  }
};

  return (
    <div className="flex flex-col gap-3 w-full text-sm px-2 text-foreground">
      <div className="text-center">
        今日の残りAI生成回数: <span className="font-bold">{remaining ?? "-"}</span>
      </div>

      {canShare && (
        <div className="text-center">
          <Button
            onClick={() => setModalOpen(true)}
            disabled={loading}
            size="sm"
            variant="ghost"
            className="text-sm text-primary hover:text-primary/80 underline"
          >
            📣 シェアして1日の利用回数を増やす
          </Button>
        </div>
      )}

      <ShareForBonusModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        cheers={cheerSamples}
        kind={kind}
        onSuccess={handleBonusGranted}
      />
    </div>
  );
}
