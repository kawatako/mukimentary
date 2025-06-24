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
  remaining: number | null; // 親から受け取る残り回数
  onChangeRemaining?: (v: number) => void; // 親のstateを更新する関数
  cheerSamples: Cheer[];
};

type LimitResponse = {
  remaining: number;
  can_share: boolean;
};

export function GenerateCountInfo({
  kind,
  remaining: initialRemaining,
  onChangeRemaining,
  cheerSamples,
}: Props) {
  // ローカルの表示用状態（初期値は親から）
  const [remaining, setRemaining] = useState<number | null>(initialRemaining);
  const [canShare, setCanShare] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { getAiLimit, postShareBonus } = useCheerApi();

  // 親から渡された remaining が更新された場合にローカルにも反映
  useEffect(() => {
    setRemaining(initialRemaining);
  }, [initialRemaining]);

  // 初回表示・kind変更時に現在の残数とシェア可否を取得
  useEffect(() => {
    const fetchLimit = async () => {
      try {
        const data: LimitResponse = await getAiLimit(kind);
        setRemaining(data.remaining);
        onChangeRemaining?.(data.remaining);
        setCanShare(data.can_share);
      } catch {
        toast.error("回数残数の取得に失敗しました");
        setRemaining(null);
        onChangeRemaining?.(0);
      }
    };
    fetchLimit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind]);

  // シェア完了後のボーナス反映
  const handleBonusGranted = async () => {
    try {
      const before = remaining ?? 0;

      await postShareBonus(kind);
      const after = await getAiLimit(kind);
      const diff = after.remaining - before;

      if (diff > 0) {
        toast.success(`AI生成回数が+${diff}回されました!`);
      } else {
        toast.info("AI生成回数は変わりませんでした");
      }

      setRemaining(after.remaining);
      onChangeRemaining?.(after.remaining);
      setCanShare(after.can_share);
    } catch (err) {
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
        今日の残りAI生成回数:{" "}
        <span className="font-bold">{remaining ?? "-"}</span>
      </div>

      {canShare && (
        <div className="text-center">
          <Button
            onClick={() => setModalOpen(true)}
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
