// frontend/components/cheer/forms/CheerAiForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { CheerType, Muscle, Pose } from "@/lib/types/prests";
import type { CheerFormState,FormState } from "@/lib/types/cheer";
import { useCheerApi } from "@/lib/hooks/useCheerApi";
import { GenerateCountInfo } from "@/components/cheer/ui/GenerateCountInfo";
import { CheerSelectField } from "@/components/cheer/forms/common/CheerSelectField";
import { CheerKeywordInput } from "@/components/cheer/forms/common/CheerKeywordInput";
import { CheerTextInput } from "@/components/cheer/forms/common/CheerTextInput";

type Props = {
  cheerTypes: CheerType[];                     // 掛け声タイプの選択肢
  muscles: Muscle[];                           // 筋肉部位の選択肢
  poses: Pose[];                               // ポーズの選択肢
  onSubmit: (form: CheerFormState) => void | Promise<void>; // フォーム送信時の処理
  remaining: number | null;                    // 残り生成回数（nullの場合は未取得）
  onChangeRemaining: (value: number | null) => void; // 残り使用回数の更新用コールバック
};

//テキストAIを用いて掛け声を生成するフォーム
export default function CheerAiForm({
  cheerTypes,
  muscles,
  poses,
  onSubmit,
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

  // 結果やエラーの状態を管理
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { generateCheer } = useCheerApi();

  /**
   * フォーム入力変更時のハンドラー（型安全に）
   */
  const handleChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /**
   * AIにより掛け声を生成する処理
   */
  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult("");
    try {
      const res = await generateCheer({
        cheer_type: cheerTypes.find((t) => t.id === Number(form.cheerTypeId))?.name,
        muscle: muscles.find((m) => m.id === Number(form.muscleId))?.name,
        pose: poses.find((p) => p.id === Number(form.poseId))?.name,
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

  /**
   * 掛け声を保存する処理
   */
  const handleSave = async () => {
    if (!result) return;
    await onSubmit({
      text: result,
      cheerTypeId: Number(form.cheerTypeId),
      muscleId: Number(form.muscleId),
      poseId: Number(form.poseId),
      keyword: form.keyword,
      imageUrl: null,
      cheerMode: "ai",
    });
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm p-5 max-w-lg mx-auto space-y-5">
      <h2 className="text-xl font-bold text-center text-foreground">
        テキストとキーワードからAIで掛け声を生成
      </h2>

      <GenerateCountInfo kind="text_ai" onChangeRemaining={onChangeRemaining} />

      {/* 選択フィールド */}
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

      {/* キーワード入力 */}
      <CheerKeywordInput value={form.keyword} onChange={(val) => handleChange("keyword", val)} />

      {/* 掛け声生成ボタン */}
      <Button
        type="button"
        onClick={handleGenerate}
        disabled={loading || typeof remaining !== "number" || remaining === 0}
        className="w-full rounded-xl text-base py-2"
      >
        {loading ? "生成中..." : "AIで掛け声生成"}
      </Button>

      {/* 結果表示と編集 */}
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

      {/* エラー表示 */}
      {error && <div className="text-sm text-red-600">{error}</div>}
    </div>
  );
}
