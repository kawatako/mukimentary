//frontend/components/cheer/CheerImageAiForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { CheerType, Muscle, Pose } from "@/lib/types/prests";
import type { CheerFormState } from "@/lib/types/cheer";
import { useCheerApi } from "@/lib/hooks/useCheerApi";
import { useImageUploader } from "@/lib/hooks/useImageUploader";
import Image from "next/image";
import { GenerateCountInfo } from "@/components/cheer/GenerateCountInfo";

type Props = {
  cheerTypes: CheerType[];
  muscles: Muscle[];
  poses: Pose[];
  onSubmit: (form: CheerFormState) => void | Promise<void>;
  remaining: number | null;
  onChangeRemaining: (value: number | null) => void;
};

export default function CheerImageAiForm({
  cheerTypes,
  muscles,
  poses,
  onSubmit,
  remaining,
  onChangeRemaining,
}: Props) {
  const [form, setForm] = useState({
    cheerTypeId: "",
    muscleId: "",
    poseId: "",
    keyword: "",
  });

  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { generateCheerByImage } = useCheerApi();

  const {
    uploading,
    uploadedUrl,
    previewUrl,
    error: uploadError,
    handleFileChange,
    reset,
  } = useImageUploader();

  const handleChange = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    if (!uploadedUrl) {
      setError("画像をアップロードしてください");
      return;
    }
    setLoading(true);
    setError(null);
    setResult("");
    try {
      const res = await generateCheerByImage({
        image_url: uploadedUrl,
        cheer_type: cheerTypes.find((t) => t.id === Number(form.cheerTypeId))
          ?.name,
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

  const handleSave = async () => {
    if (!result) return;
    await onSubmit({
      text: result,
      cheerTypeId: Number(form.cheerTypeId),
      muscleId: Number(form.muscleId),
      poseId: Number(form.poseId),
      keyword: form.keyword,
      imageUrl: uploadedUrl,
      cheerMode: "image_ai",
    });
  };

  return (
    <div className='bg-card border border-border rounded-xl shadow-sm p-5 max-w-lg mx-auto space-y-5'>
      <h2 className='text-xl font-bold text-center text-foreground'>
        画像とキーワードからAIで掛け声を生成
      </h2>

      <GenerateCountInfo
        kind='image_ai'
        onChangeRemaining={onChangeRemaining}
      />

      {/* 画像アップロード */}
      <div className='space-y-2'>
        <label className='text-sm font-medium text-muted-foreground block'>
          画像ファイル(必須)
        </label>

        {/* 擬似ボタン */}
        <label className='block w-full cursor-pointer rounded-xl border border-dashed border-input bg-white px-4 py-3 text-center text-sm text-muted-foreground hover:bg-gray-50 transition'>
          画像を選択
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            disabled={uploading}
            className='hidden'
          />
        </label>

        {/* ヒント表示 */}
        {!previewUrl && !uploading && (
          <p className='text-xs text-muted-foreground text-center'>
            筋肉やポージングがわかる画像をアップロードしてください
          </p>
        )}

        {/* プレビュー画像 */}
        {previewUrl && (
          <div className='mt-2 space-y-2'>
            <Image
              src={previewUrl}
              alt='画像プレビュー'
              className='rounded-xl border max-h-40 object-contain mx-auto'
              width={320}
              height={240}
            />
            <div className='flex justify-center'>
              <Button
                type='button'
                onClick={reset}
                variant='outline'
                size='sm'
                className='rounded-lg'
              >
                画像を変更
              </Button>
            </div>
          </div>
        )}

        {/* エラー表示 */}
        {uploadError && (
          <div className='text-sm text-red-600'>{uploadError}</div>
        )}
      </div>

      {/* 選択フィールド */}
      {[
        { key: "cheerTypeId", label: "タイプ(任意)", options: cheerTypes },
        { key: "muscleId", label: "筋肉部位(任意)", options: muscles },
        { key: "poseId", label: "ポーズ(任意)", options: poses },
      ].map(({ key, label, options }) => (
        <div key={key} className='space-y-1'>
          <label className='text-sm font-medium text-muted-foreground'>
            {label}
          </label>
          <select
            value={form[key as keyof typeof form]}
            onChange={(e) =>
              handleChange(key as keyof typeof form, e.target.value)
            }
            className='w-full rounded-lg border border-input bg-white px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring'
            required
          >
            <option value=''>選択してください</option>
            {options.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.name}（{opt.description}）
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* フリーワード */}
      <div className='space-y-1'>
        <label className='text-sm font-medium text-muted-foreground'>
          フリーワード（任意）
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
        disabled={
          loading ||
          uploading ||
          !uploadedUrl ||
          typeof remaining !== "number" ||
          remaining === 0
        }
        className='w-full rounded-xl text-base py-2'
      >
        {loading ? "生成中..." : "画像+AIで掛け声生成"}
      </Button>

      {/* 結果表示 */}
      {result && (
        <div className='space-y-1'>
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

      {error && <div className='text-sm text-red-600'>{error}</div>}
    </div>
  );
}
