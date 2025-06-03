// frontend/lib/hooks/useImageUploader.ts
import { useState } from "react";

type UploadResult = {
  uploading: boolean;
  uploadedUrl: string | null;
  previewUrl: string | null;
  error: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
};

export function useImageUploader(): UploadResult {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // inputのonChangeイベントハンドラ
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    setUploading(true);
    setError(null);
    try {
      // S3署名付きURL取得APIを呼ぶ（ここは自身のAPIに合わせて変更）
      const res = await fetch("/api/upload-url");
      if (!res.ok) throw new Error("署名付きURLの取得に失敗しました");
      const { upload_url, public_url } = await res.json();
      const uploadRes = await fetch(upload_url, {
        method: "PUT",
        body: file,
      });
      if (!uploadRes.ok) throw new Error("S3へのアップロードに失敗しました");
      setUploadedUrl(public_url);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "アップロードに失敗しました"
      );
    } finally {
      setUploading(false);
    }
  };

  // 状態のリセット
  const reset = () => {
    setUploadedUrl(null);
    setPreviewUrl(null);
    setError(null);
    setUploading(false);
  };

  return { uploading, uploadedUrl, previewUrl, error, handleFileChange, reset };
}
