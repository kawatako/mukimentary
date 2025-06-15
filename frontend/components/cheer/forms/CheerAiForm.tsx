// frontend/components/cheer/forms/CheerAiForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GenerateCountInfo } from "@/components/cheer/ui/GenerateCountInfo";
import type { CheerType, Muscle, Pose } from "@/lib/types/prests";
import type { CheerFormState } from "@/lib/types/cheer";
import { useCheerApi } from "@/lib/hooks/useCheerApi";

type Props = {
  cheerTypes: CheerType[];
  muscles: Muscle[];
  poses: Pose[];
  onSubmit: (form: CheerFormState) => void | Promise<void>;
  remaining: number | null;
  onChangeRemaining: (n: number | null) => void;
};

export default function CheerAiForm({
  cheerTypes,
  muscles,
  poses,
  onSubmit,
  remaining,
  onChangeRemaining,
}: Props) {
  const [form, setForm] = useState<{
    cheerTypeId: number | "";
    muscleId: number | "";
    poseId: number | "";
    keyword?: string;
  }>({
    cheerTypeId: "",
    muscleId: "",
    poseId: "",
    keyword: "",
  });

  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { generateCheer } = useCheerApi();

  const handleChange = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult("");
    try {
      const res = await generateCheer({
        cheer_type: cheerTypes.find((t) => t.id === form.cheerTypeId)?.name,
        muscle: muscles.find((m) => m.id === form.muscleId)?.name,
        pose: poses.find((p) => p.id === form.poseId)?.name,
        keyword: form.keyword,
      });
      if (res.result) setResult(res.result);
      if (res.error) setError(res.error);
    } catch (e: unknown) {
      setError(
        e instanceof Error
          ? e.message || "生成に失敗しました"
          : "生成に失敗しました"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!result) return;
    await onSubmit({
      text: result,
      cheerTypeId: form.cheerTypeId,
      muscleId: form.muscleId,
      poseId: form.poseId,
      keyword: form.keyword || "",
      cheerMode: "ai",
    });
  };

  return (
    <div className='bg-card border border-border rounded-xl shadow-sm p-5 max-w-lg mx-auto space-y-5'>
      <h2 className='text-xl font-bold text-center text-foreground'>
        キーワードからAIで掛け声を生成
      </h2>

      <GenerateCountInfo kind='text_ai' onChangeRemaining={onChangeRemaining} />

      {/* タイプ */}
      <div className='space-y-1'>
        <label className='text-sm font-medium text-muted-foreground'>
          タイプ(任意)
        </label>
        <select
          value={form.cheerTypeId}
          onChange={(e) =>
            handleChange(
              "cheerTypeId",
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
          className='w-full rounded-lg border border-input bg-white px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring'
          required
        >
          <option value=''>選択してください</option>
          {cheerTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}（{type.description}）
            </option>
          ))}
        </select>
      </div>

      {/* 筋肉部位 */}
      <div className='space-y-1'>
        <label className='text-sm font-medium text-muted-foreground'>
          筋肉部位(任意)
        </label>
        <select
          value={form.muscleId}
          onChange={(e) =>
            handleChange(
              "muscleId",
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
          className='w-full rounded-lg border border-input bg-white px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring'
          required
        >
          <option value=''>選択してください</option>
          {muscles.map((muscle) => (
            <option key={muscle.id} value={muscle.id}>
              {muscle.name}（{muscle.description}）
            </option>
          ))}
        </select>
      </div>

      {/* ポーズ */}
      <div className='space-y-1'>
        <label className='text-sm font-medium text-muted-foreground'>
          ポーズ(任意)
        </label>
        <select
          value={form.poseId}
          onChange={(e) =>
            handleChange(
              "poseId",
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
          className='w-full rounded-lg border border-input bg-white px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring'
          required
        >
          <option value=''>選択してください</option>
          {poses.map((pose) => (
            <option key={pose.id} value={pose.id}>
              {pose.name}（{pose.description}）
            </option>
          ))}
        </select>
      </div>

      {/* キーワード */}
      <div className='space-y-1'>
        <label className='text-sm font-medium text-muted-foreground'>
          フリーワード(任意)
        </label>
        <input
          type='text'
          maxLength={50}
          value={form.keyword}
          onChange={(e) => handleChange("keyword", e.target.value)}
          className='w-full rounded-lg border border-input bg-white px-3 py-2 text-sm placeholder:text-muted-foreground'
          placeholder='例：流行語・アニメ名 など(50文字以内)'
        />
      </div>

      {/* 生成ボタン */}
      <Button
        type='button'
        onClick={handleGenerate}
        disabled={loading || typeof remaining !== "number" || remaining === 0}
        className='w-full rounded-xl text-base py-2'
      >
        {loading ? "生成中..." : "AIで掛け声生成"}
      </Button>

      {/* 結果 */}
      {result && (
        <div className='space-y-1 mt-4'>
          <label className='text-sm font-medium text-muted-foreground'>
            生成結果（編集可）
          </label>
          <textarea
            className='w-full rounded-lg border border-input bg-white px-3 py-2 text-sm resize-none'
            rows={2}
            value={result}
            onChange={(e) => setResult(e.target.value)}
          />
          <Button
            type='button'
            onClick={handleSave}
            className='w-full rounded-xl text-base py-2 mt-2'
          >
            この内容で保存
          </Button>
        </div>
      )}

      {/* エラー */}
      {error && <div className='text-sm text-red-600'>{error}</div>}
    </div>
  );
}
