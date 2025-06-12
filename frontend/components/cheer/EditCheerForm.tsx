// frontend/components/cheer/EditCheerForm.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { Muscle, Pose } from "@/lib/types/prests";
import type { CheerFormState } from "@/lib/types/cheer";
import Image from "next/image";
import { useImageUploader } from "@/lib/hooks/useImageUploader";

type Props = {
  cheerId: number;
  muscles: Muscle[];
  poses: Pose[];
  initialForm: CheerFormState;
  onSubmit: (form: CheerFormState) => void | Promise<void>;
};

export default function EditCheerForm({
  muscles,
  poses,
  initialForm,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<CheerFormState>(initialForm);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm(initialForm);
  }, [initialForm]);

  const handleChange = <K extends keyof CheerFormState>(
    key: K,
    value: CheerFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const {
    uploading,
    uploadedUrl,
    previewUrl,
    error: uploadError,
    handleFileChange,
    reset,
  } = useImageUploader();

  useEffect(() => {
    if (uploadedUrl) {
      setForm((prev) => ({ ...prev, imageUrl: uploadedUrl }));
    }
  }, [uploadedUrl]);

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
      className="w-full max-w-lg mx-auto bg-card border border-border rounded-xl shadow-sm p-4 space-y-4"
    >
      <h2 className="text-lg font-bold text-card-foreground">掛け声を編集</h2>

      <div className="space-y-1">
        <label className="block text-sm font-semibold">掛け声テキスト</label>
        <input
          type="text"
          value={form.text}
          maxLength={50}
          onChange={(e) => handleChange("text", e.target.value)}
          className="border border-input rounded-md px-3 py-2 w-full bg-background text-foreground"
          placeholder="例：腹筋6LDKかい!!"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-semibold">筋肉部位</label>
        <select
          value={form.muscleId ?? ""}
          onChange={(e) =>
            handleChange("muscleId", e.target.value === "" ? "" : Number(e.target.value))
          }
          className="border border-input rounded-md px-3 py-2 w-full bg-background text-foreground"
        >
          <option value="">選択してください</option>
          {muscles.map((muscle) => (
            <option key={muscle.id} value={muscle.id}>
              {muscle.name}（{muscle.description}）
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-semibold">ポーズ</label>
        <select
          value={form.poseId ?? ""}
          onChange={(e) =>
            handleChange("poseId", e.target.value === "" ? "" : Number(e.target.value))
          }
          className="border border-input rounded-md px-3 py-2 w-full bg-background text-foreground"
        >
          <option value="">選択してください</option>
          {poses.map((pose) => (
            <option key={pose.id} value={pose.id}>
              {pose.name}（{pose.description}）
            </option>
          ))}
        </select>
      </div>

      {/* 画像アップロードエリア */}
      <div className="space-y-2">
        <label className="text-sm font-semibold block">画像（任意）</label>

        {/* 現在の画像プレビュー */}
        {form.imageUrl && !previewUrl && (
          <div className="mb-2">
            <Image
              src={form.imageUrl}
              alt="現在の画像"
              width={320}
              height={240}
              className="rounded-xl border max-h-40 object-contain mx-auto"
            />
          </div>
        )}

        {/* 新しいプレビュー */}
        {previewUrl && (
          <div className="mb-2">
            <Image
              src={previewUrl}
              alt="プレビュー画像"
              width={320}
              height={240}
              className="rounded-xl border max-h-40 object-contain mx-auto"
            />
            <div className="flex justify-center mt-2">
              <Button
                type="button"
                onClick={reset}
                variant="outline"
                size="sm"
                className="rounded-lg"
              >
                画像を変更
              </Button>
            </div>
          </div>
        )}

        {/* アップロードボタン */}
        <label className="block w-full cursor-pointer rounded-xl border border-dashed border-input bg-white px-4 py-3 text-center text-sm text-muted-foreground hover:bg-gray-50 transition">
          画像を選択
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>

        {/* エラー表示 */}
        {uploadError && <div className="text-sm text-red-600">{uploadError}</div>}
      </div>

      {error && <div className="text-destructive text-sm">{error}</div>}

      <Button type="submit" className="w-full mt-2">
        保存
      </Button>
    </form>
  );
}
