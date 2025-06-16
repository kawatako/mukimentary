//frontend/components/cheer/forms/CheerImageAiForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { CheerType, Muscle, Pose } from "@/lib/types/prests";
import type { CheerFormState,FormState,Cheer } from "@/lib/types/cheer";
import { useCheerApi } from "@/lib/hooks/useCheerApi";
import { GenerateCountInfo } from "@/components/cheer/ui/GenerateCountInfo";
import { CheerSelectField } from "@/components/cheer/forms/common/CheerSelectField";
import { CheerKeywordInput } from "@/components/cheer/forms/common/CheerKeywordInput";
import { CheerTextInput } from "@/components/cheer/forms/common/CheerTextInput";
import { CheerImageUploader } from "@/components/cheer/forms/common/CheerImageUploader";

type Props = {
  cheerTypes: CheerType[];                     // 掛け声タイプの選択肢（セレクト用）
  muscles: Muscle[];                           // 筋肉部位の選択肢（セレクト用）
  poses: Pose[];                               // ポーズの選択肢（セレクト用）
  onSubmit: (form: CheerFormState) => void | Promise<void>; // 掛け声データの保存処理（親から受け取る）
  cheerSamples:Cheer[];                       // シェアボーナスで取得用の掛け声一覧
  remaining: number | null;                    // 残りの生成可能回数（null = 未取得）
  onChangeRemaining: (value: number | null) => void; // 残り回数を更新するための関数
};

//画像とキーワードからAIで掛け声を生成するフォームコンポーネント
export default function CheerImageAiForm({
  cheerTypes,
  muscles,
  poses,
  onSubmit,
  cheerSamples,
  remaining,
  onChangeRemaining,
}: Props) {
  // 入力フィールドの状態管理（cheerTypeId, muscleId, poseId は number または空文字）
  const [form, setForm] = useState<FormState>({
    cheerTypeId: "",
    muscleId: "",
    poseId: "",
    keyword: "",
  });

  // アップロードされた画像のURL
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  // 生成された掛け声テキスト
  const [result, setResult] = useState<string>("");
  // ローディング中かどうか
  const [loading, setLoading] = useState(false);
  // エラーメッセージ（存在する場合）
  const [error, setError] = useState<string | null>(null);
  // 掛け声生成APIの呼び出し関数を取得
  const { generateCheerByImage } = useCheerApi();

  //セレクトボックス変更時のハンドラー
  const handleChange = (
    key: "cheerTypeId" | "muscleId" | "poseId",
    value: number | ""
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  //キーワード入力欄の変更ハンドラー
  const handleKeywordChange = (value: string) => {
    setForm((prev) => ({ ...prev, keyword: value }));
  };

  //画像とキーワードを元にAIに掛け声生成を依頼
  const handleGenerate = async () => {
    if (!imageUrl) {
      setError("画像をアップロードしてください");
      return;
    }
    setLoading(true);
    setError(null);
    setResult("");
    try {
      const res = await generateCheerByImage({
        image_url: imageUrl,
        cheer_type: cheerTypes.find((t) => t.id === form.cheerTypeId)?.name,
        muscle: muscles.find((m) => m.id === form.muscleId)?.name,
        pose: poses.find((p) => p.id === form.poseId)?.name,
        keyword: form.keyword,
      });
      if ("remaining" in res && typeof res.remaining === "number") {
        onChangeRemaining(res.remaining);
      }
      if (res.result) setResult(res.result);
      if (res.error) setError(res.error);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || "生成に失敗しました");
      } else {
        setError("生成に失敗しました");
      }
    } finally {
      setLoading(false);
    }
  };

  //生成結果を保存（onSubmit に渡す）
  const handleSave = async () => {
    if (!result) return;
    await onSubmit({
      text: result,
      cheerTypeId: form.cheerTypeId,
      muscleId: form.muscleId,
      poseId: form.poseId,
      keyword: form.keyword,
      imageUrl: imageUrl,
      cheerMode: "image_ai",
    });
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm p-5 max-w-lg mx-auto space-y-5">
      <h2 className="text-xl font-bold text-center text-foreground">
        画像とキーワードからAIで掛け声を生成
      </h2>

      {/* 残り生成回数の表示 */}
      <GenerateCountInfo kind="image_ai" onChangeRemaining={onChangeRemaining} cheerSamples={cheerSamples}/>

      {/* 画像アップロード */}
      <CheerImageUploader onUploadComplete={(url) => setImageUrl(url)} />

      {/* 各種セレクトボックス（タイプ・筋肉・ポーズ） */}
      <CheerSelectField
        label="タイプ（任意）"
        value={form.cheerTypeId}
        onChange={(val) => handleChange("cheerTypeId", val)}
        options={cheerTypes.map((c) => ({
          value: c.id,
          label: `${c.name}（${c.description}）`,
        }))}
      />
      <CheerSelectField
        label="筋肉部位（任意）"
        value={form.muscleId}
        onChange={(val) => handleChange("muscleId", val)}
        options={muscles.map((m) => ({
          value: m.id,
          label: `${m.name}（${m.description}）`,
        }))}
      />
      <CheerSelectField
        label="ポーズ（任意）"
        value={form.poseId}
        onChange={(val) => handleChange("poseId", val)}
        options={poses.map((p) => ({
          value: p.id,
          label: `${p.name}（${p.description}）`,
        }))}
      />

      {/* フリーワード入力欄 */}
      <CheerKeywordInput value={form.keyword} onChange={handleKeywordChange} />

      {/* 掛け声生成ボタン */}
      <Button
        type="button"
        onClick={handleGenerate}
        disabled={loading || !imageUrl || typeof remaining !== "number" || remaining === 0}
        className="w-full rounded-xl text-base py-2"
      >
        {loading ? "生成中..." : "画像+AIで掛け声生成"}
      </Button>

      {/* 生成結果の表示と保存 */}
      {result && (
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">
            生成結果（編集可）
          </label>
          <CheerTextInput
            label="掛け声テキスト"
            value={result}
            onChange={(val) => setResult(val)}
          />
          <Button
            type="button"
            onClick={handleSave}
            className="w-full rounded-xl text-base py-2 mt-2"
          >
            この内容で保存
          </Button>
        </div>
      )}

      {/* エラーメッセージ表示 */}
      {error && <div className="text-sm text-red-600">{error}</div>}
    </div>
  );
}
