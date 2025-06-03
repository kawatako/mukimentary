// frontend/components/cheer/CheerForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { CheerType, Muscle, Pose } from "@/lib/types/prests";

type CheerFormState = {
  text: string;
  cheerTypeId: number | "";
  muscleId: number | "";
  poseId: number | "";
};

type Props = {
  cheerTypes: CheerType[];
  muscles: Muscle[];
  poses: Pose[];
  onSubmit: (form: CheerFormState) => void | Promise<void>;
};

export default function CheerForm({
  cheerTypes,
  muscles,
  poses,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<CheerFormState>({
    text: "",
    cheerTypeId: "",
    muscleId: "",
    poseId: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = <K extends keyof CheerFormState>(key: K, value: CheerFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.text || form.text.length > 20) {
      setError("掛け声テキストは1〜20字で入力してください");
      return;
    }
    if (!form.cheerTypeId || !form.muscleId || !form.poseId) {
      setError("すべての項目を選択してください");
      return;
    }
    setError(null);
    await onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-xl bg-white shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-lg font-bold">掛け声を作成</h2>
      <div>
        <label className="block font-semibold">掛け声テキスト（20字以内）</label>
        <input
          type="text"
          value={form.text}
          maxLength={20}
          onChange={(e) => handleChange("text", e.target.value)}
          className="border rounded px-2 py-1 w-full"
          placeholder="例：その背中、翼のようだ！"
          required
        />
      </div>
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
      {error && <div className="text-red-600">{error}</div>}
      <Button type="submit" className="mt-2">
        保存
      </Button>
    </form>
  );
}
