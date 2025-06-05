// frontend/components/cheer/CheerImageAiForm.tsx
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
  remaining: number | null; // 親管理の残り回数
  onChangeRemaining: (value: number | null) => void; // 親への残数通知
};

export default function CheerImageAiForm({
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
  const { generateCheerByImage } = useCheerApi();

  // 画像アップロード用hooks
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

  // AI生成実行
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
        cheer_type: cheerTypes.find((t) => t.id === form.cheerTypeId)?.name,
        muscle: muscles.find((m) => m.id === form.muscleId)?.name,
        pose: poses.find((p) => p.id === form.poseId)?.name,
        keyword: form.keyword,
      });
      // APIのレスポンスに残数含まれる場合のみ更新（なければ親の値を維持）
      if ("remaining" in res && typeof res.remaining === "number") {
        onChangeRemaining(res.remaining);
      }
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

  // 保存
  const handleSave = async () => {
    if (!result) return;
    await onSubmit({
      text: result,
      cheerTypeId: form.cheerTypeId,
      muscleId: form.muscleId,
      poseId: form.poseId,
      imageUrl: uploadedUrl,
      keyword: form.keyword || "",
      cheerMode: "image_ai",
    });
  };

  return (
    <div className="space-y-4 p-4 border rounded-xl bg-white shadow-md max-w-lg mx-auto">
      <h2 className="text-lg font-bold">画像AIで掛け声生成</h2>

      {/* 残り回数UIを最上部に配置 */}
      <GenerateCountInfo kind="image_ai" onChangeRemaining={onChangeRemaining} />

      <div>
        <label className="block font-semibold">画像ファイル</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
        {previewUrl && (
          <div className="mt-2">
            <Image
              src={previewUrl}
              alt="画像プレビュー"
              className="rounded"
              width={320}
              height={240}
              style={{ objectFit: "contain", maxHeight: "160px" }}
            />
            <Button
              type="button"
              onClick={reset}
              className="ml-2"
              variant="outline"
              size="sm"
            >
              画像を変更
            </Button>
          </div>
        )}
        {uploadError && (
          <div className="text-red-600 mt-2">{uploadError}</div>
        )}
      </div>
      <div>
        <label className="block font-semibold">タイプ</label>
        <select
          value={form.cheerTypeId}
          onChange={(e) =>
            handleChange(
              "cheerTypeId",
              e.target.value === "" ? "" : Number(e.target.value)
            )
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
            handleChange(
              "muscleId",
              e.target.value === "" ? "" : Number(e.target.value)
            )
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
            handleChange(
              "poseId",
              e.target.value === "" ? "" : Number(e.target.value)
            )
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
        disabled={
          loading ||
          uploading ||
          !uploadedUrl ||
          typeof remaining !== "number" ||
          remaining === 0
        }
        className="mt-2"
      >
        {loading ? "生成中..." : "画像+AIで掛け声生成"}
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
