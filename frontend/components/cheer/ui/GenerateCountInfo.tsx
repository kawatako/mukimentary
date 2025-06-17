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
  remaining,
  onChangeRemaining,
  cheerSamples,
}: Props) {
  const [canShare, setCanShare] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { getAiLimit, postShareBonus } = useCheerApi();

  // 生成可能回数取得（初回表示時やkind変更時に呼ばれる）
  const fetchLimit = async () => {
    try {
      const data: LimitResponse = await getAiLimit(kind);
      onChangeRemaining?.(data.remaining);
      setCanShare(data.can_share);
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
      const before = remaining;

      await postShareBonus(kind);
      await fetchLimit(); // UI反映用に更新

      const after = await getAiLimit(kind);
      const diff = after.remaining - (before ?? 0);

      if (diff > 0) {
        toast.success(`AI生成回数が+${diff}回されました!`);
      } else {
        toast.info("AI生成回数は変わりませんでした");
      }

      onChangeRemaining?.(after.remaining);
      setCanShare(after.can_share);
    } catch (err) {
      if (
        err instanceof Error &&
        err.message.includes("本日のシェアボーナスはすでに付与されています")
      ) {
        // メッセージは抑制（UI上は表示しない）
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
