//frontend/components/cheer/forms/CheerManualForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { CheerType, Muscle, Pose } from "@/lib/types/prests";
import type { CheerFormState } from "@/lib/types/cheer";

type Props = {
  cheerTypes: CheerType[];
  muscles: Muscle[];
  poses: Pose[];
  onSubmit: (form: CheerFormState) => void | Promise<void>;
};

export default function CheerManualForm({
  muscles,
  poses,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<CheerFormState>({
    text: "",
    cheerTypeId: "",
    muscleId: "",
    poseId: "",
    cheerMode: "manual",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = <K extends keyof CheerFormState>(key: K, value: CheerFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.text || form.text.length > 50) {
      setError("掛け声テキストは1〜50字で入力してください");
      return;
    }

    setError(null);
    await onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-xl shadow-sm p-5 max-w-lg mx-auto space-y-5"
    >
      <h2 className="text-xl font-bold text-center text-foreground">手動で掛け声を作成</h2>

      {/* 掛け声テキスト */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">
          掛け声テキスト
        </label>
        <input
          type="text"
          value={form.text}
          maxLength={50}
          onChange={(e) => handleChange("text", e.target.value)}
          className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="例：背中にでっかいジープ乗せてんのかい!!"
          required
        />
      </div>

      {/* 筋肉（任意） */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">筋肉部位（任意）</label>
        <select
          value={form.muscleId}
          onChange={(e) => handleChange("muscleId", e.target.value === "" ? "" : Number(e.target.value))}
          className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="">選択してください</option>
          {muscles.map((muscle) => (
            <option key={muscle.id} value={muscle.id}>
              {muscle.name}（{muscle.description}）
            </option>
          ))}
        </select>
      </div>

      {/* ポーズ（任意） */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">ポーズ（任意）</label>
        <select
          value={form.poseId}
          onChange={(e) => handleChange("poseId", e.target.value === "" ? "" : Number(e.target.value))}
          className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="">選択してください</option>
          {poses.map((pose) => (
            <option key={pose.id} value={pose.id}>
              {pose.name}（{pose.description}）
            </option>
          ))}
        </select>
      </div>

      {/* エラー表示 */}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {/* 保存ボタン */}
      <Button type="submit" className="w-full rounded-xl text-base py-2">
        保存
      </Button>
    </form>
  );
}
