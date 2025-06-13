// frontend/lib/hooks/useImageUploader.ts
import { useState } from "react";
import { useAuthFetch } from "@/lib/hooks/useAuthFetch";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";

type UploadResult = {
  uploading: boolean;
  uploadedUrl: string | null;
  previewUrl: string | null;
  error: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
};

export function useImageUploader(): UploadResult {
// 画像アップロード中かどうか（ローディング状態管理）
const [uploading, setUploading] = useState(false);
// S3へのアップロードが完了した画像のURL（DB保存やプレビュー用に使う）
const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
// 画像プレビュー用のローカルURL（inputで画像選択した瞬間に表示用）
const [previewUrl, setPreviewUrl] = useState<string | null>(null);
// アップロード失敗時のエラーメッセージ
const [error, setError] = useState<string | null>(null);
// JWT認証付きfetchラッパー（APIリクエスト用）
const { fetchWithAuth } = useAuthFetch();
//APIのベースURLを取得
const API_BASE = getBaseUrl();

const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // --- 拡張子バリデーション ---
  const allowedExts = ["jpg", "jpeg", "png", "webp"];
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ext || !allowedExts.includes(ext)) {
    setError("対応画像形式（JPG, JPEG, PNG, WEBP）のみアップロードできます");
    return;
  }

  // --- サイズバリデーション（5MB） ---
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    setError("5MB以下の画像のみアップロードできます");
    return;
  }

  setPreviewUrl(URL.createObjectURL(file));
  setUploading(true);
  setError(null);

    try {
      // 絶対パスでAPI呼び出し
      const res = await fetchWithAuth(`${API_BASE}/api/v1/uploads/presign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ext,
          size: file.size,
        }),
      });

      // 失敗時はエラーメッセージ取得
      if (!res.ok) {
        let errorMsg = "署名付きURLの取得に失敗しました";
        try {
          const data = await res.json();
          if (data && data.error) errorMsg = data.error;
        } catch { /* ignore */ }
        setError(errorMsg);
        setUploading(false);
        return;
      }

      // 成功時
      const { upload_url, public_url } = await res.json();


    // S3に直接PUT
    const uploadRes = await fetch(upload_url, {
      method: "PUT",
      headers: { "Content-Type": file.type},
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

  const reset = () => {
    setUploadedUrl(null);
    setPreviewUrl(null);
    setError(null);
    setUploading(false);
  };

  return { uploading, uploadedUrl, previewUrl, error, handleFileChange, reset };
}
