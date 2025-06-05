// frontend/components/cheer/CheerAiForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GenerateCountInfo } from "@/components/cheer/GenerateCountInfo";
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
  const [form, setForm] = useState<{ cheerTypeId: number | ""; muscleId: number | ""; poseId: number | ""; keyword?: string; }>({
    cheerTypeId: "",
    muscleId: "",
    poseId: "",
    keyword: "",
  });
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { generateCheer } = useCheerApi();

  const handleChange = <K extends keyof typeof form>(key: K, value: typeof form[K]) => {
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
      if (e instanceof Error) {
        setError(e.message || "生成に失敗しました");
      } else {
        setError("生成に失敗しました");
      }
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
    <div className="space-y-4 p-4 border rounded-xl bg-white shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-bold">AIで掛け声生成</h2>
      {/* 残り回数をコールバックで受け取る */}
      <GenerateCountInfo kind="text_ai" onChangeRemaining={onChangeRemaining} />

      <div>
        <label className="block font-semibold">タイプ</label>
        <select
          value={form.cheerTypeId}
          onChange={(e) =>
            handleChange("cheerTypeId", e.target.value === "" ? "" : Number(e.target.value))
          }
          className="border rounded px-2 py-1 w-full"
          required
        >
          <option value="">選択してください</option>
          {cheerTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}（{type.description}）
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-semibold">筋肉部位</label>
        <select
          value={form.muscleId}
          onChange={(e) =>
            handleChange("muscleId", e.target.value === "" ? "" : Number(e.target.value))
          }
          className="border rounded px-2 py-1 w-full"
          required
        >
          <option value="">選択してください</option>
          {muscles.map((muscle) => (
            <option key={muscle.id} value={muscle.id}>
              {muscle.name}（{muscle.description}）
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-semibold">ポーズ</label>
        <select
          value={form.poseId}
          onChange={(e) =>
            handleChange("poseId", e.target.value === "" ? "" : Number(e.target.value))
          }
          className="border rounded px-2 py-1 w-full"
          required
        >
          <option value="">選択してください</option>
          {poses.map((pose) => (
            <option key={pose.id} value={pose.id}>
              {pose.name}（{pose.description}）
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-semibold">フリーワード（任意）</label>
        <input
          type="text"
          value={form.keyword}
          onChange={(e) => handleChange("keyword", e.target.value)}
          className="border rounded px-2 py-1 w-full"
          placeholder="例：流行語・アニメ名 など"
        />
      </div>

      <Button
        type="button"
        onClick={handleGenerate}
        disabled={loading || typeof remaining !== "number" || remaining === 0}
        className="mt-2"
      >
        {loading ? "生成中..." : "AIで掛け声生成"}
      </Button>

      {result && (
        <div className="mt-4">
          <label className="block font-semibold mb-1">生成結果（編集可）</label>
          <textarea
            className="border rounded px-2 py-1 w-full"
            rows={2}
            value={result}
            onChange={(e) => setResult(e.target.value)}
          />
          <Button type="button" onClick={handleSave} className="mt-2">
            この内容で保存
          </Button>
        </div>
      )}
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
}
