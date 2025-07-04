// frontend/components/cheer/forms/EditCheerForm.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { Muscle, Pose } from "@/lib/types/prests";
import type { CheerFormState } from "@/lib/types/cheer";
import { useImageUploader } from "@/lib/hooks/useImageUploader";

type Props = {
  cheerId: number;                                  // 編集対象の掛け声ID（未使用だが保持）
  muscles: Muscle[];                               // 筋肉部位の選択肢
  poses: Pose[];                                   // ポーズの選択肢
  initialForm: CheerFormState;                     // 初期状態のフォームデータ
  onSubmit: (form: CheerFormState) => void | Promise<void>; // 保存時の処理（親に渡す）
};

/**
 * 掛け声を編集するためのフォームコンポーネント
 */
export default function EditCheerForm({
  muscles,
  poses,
  initialForm,
  onSubmit,
}: Props) {
  // 入力フォームの状態
  const [form, setForm] = useState<CheerFormState>(initialForm);

  // 入力バリデーションエラー用の状態
  const [error, setError] = useState<string | null>(null);

  // 初期データが変わったときに再設定
  useEffect(() => {
    setForm(initialForm);
  }, [initialForm]);

  // 各フィールドの変更ハンドラ
  const handleChange = <K extends keyof CheerFormState>(
    key: K,
    value: CheerFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // 画像アップロード用のカスタムフック
  const {
    uploading,
    uploadedUrl,
    previewUrl,
    error: uploadError,
    handleFileChange,
    reset,
  } = useImageUploader();

  // アップロード完了後に画像URLをフォームに反映
  useEffect(() => {
    if (uploadedUrl) {
      setForm((prev) => ({ ...prev, imageUrl: uploadedUrl }));
    }
  }, [uploadedUrl]);

  // フォーム送信処理
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

      {/* 掛け声テキスト入力欄 */}
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

      {/* 筋肉部位の選択 */}
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

      {/* ポーズの選択 */}
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={form.imageUrl}
              alt="現在の画像"
              className="rounded-xl border max-h-40 object-contain mx-auto"
              width={320}
              height={240}
            />
          </div>
        )}

        {/* 新しいプレビュー */}
        {previewUrl && (
          <div className="mb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="プレビュー画像"
              className="rounded-xl border max-h-40 object-contain mx-auto"
              width={320}
              height={240}
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

        {/* アップロード用のボタン */}
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

        {/* アップロードエラー表示 */}
        {uploadError && <div className="text-sm text-red-600">{uploadError}</div>}
      </div>

      {/* 入力エラー表示 */}
      {error && <div className="text-destructive text-sm">{error}</div>}

      {/* 送信ボタン */}
      <Button type="submit" className="w-full mt-2">
        保存
      </Button>
    </form>
  );
}
