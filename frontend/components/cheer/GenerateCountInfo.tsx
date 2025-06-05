// frontend/components/cheer/GenerateCountInfo.tsx
//回数表示＆シェアボタンUIコンポーネント

"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getAiLimit, postShareBonus } from "@/lib/api/aiLimit";
import { toast } from "sonner";

type Props = {
  kind: "text_ai" | "image_ai";
  onChangeRemaining?: (v: number) => void; // 親への回数残数通知
};

type LimitResponse = {
  remaining: number;
  can_share: boolean;
};

export  function GenerateCountInfo({ kind, onChangeRemaining }: Props) {
  //今ログインしているユーザーが、その日そのAI種別（テキスト or 画像）であと何回生成できるかの残り回数
  const [remaining, setRemaining] = useState<number | null>(null);
  //「シェアによる回数回復（+1回）」がまだ可能かどうか
  const [canShare, setCanShare] = useState(false);
  //API通信中かどうか
  const [loading, setLoading] = useState(false);

// 生成可能回数取得
const fetchLimit = async () => {
  try {
    const data: LimitResponse = await getAiLimit(kind);
    setRemaining(data.remaining);
    setCanShare(data.can_share);
    onChangeRemaining?.(data.remaining);
  } catch {
    toast.error("回数残数の取得に失敗しました");
    onChangeRemaining?.(0); // エラー時は0に設定
  }
};

  // 初回マウント時に残り回数を取得(ページ（またはタブ）が切り替わった時に、常に最新の残数・状態を表示するため)
  useEffect(() => {
    fetchLimit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind]);

  // シェアボーナス付与
  const handleShare = async () => {
    setLoading(true);
    try {
      await postShareBonus(kind);
      toast.success("AI生成回数が+1回されました!");
      fetchLimit();
    } catch {
      toast.error("シェアボーナス付与に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 mt-2">
      <span>
        残りAI生成回数:{" "}
        <span className={remaining === 0 ? "text-red-600 font-bold" : "font-bold"}>
          {remaining ?? "-"}
        </span>
      </span>
      {canShare && (
        <Button
          onClick={handleShare}
          disabled={loading}
          size="sm"
          className="ml-2"
          variant="outline"
        >
          {loading ? "付与中..." : "シェアで+1回"}
        </Button>
      )}
    </div>
  );
}
