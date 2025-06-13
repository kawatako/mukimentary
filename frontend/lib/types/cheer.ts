// frontend/lib/types/cheer.ts
//掛け声関連の型定義

//掛け声の型
export type Cheer = {
  id: number;
  text: string;
  cheer_type_id?: number;
  muscle_id?: number;
  pose_id?: number;
  cheer_mode: "manual" | "ai" | "image_ai";
  image_url?: string | null;
  keyword?: string | null;
  position?: number;
  created_at: string;
  updated_at: string;
  cheer_type?: { id: number; name: string; description?: string };
  muscle?: { id: number; name: string; description?: string };
  pose?: { id: number; name: string; description?: string };
};

//ページネーション付き取得用の戻り値
export type PaginatedCheers = {
  cheers: Cheer[];
  totalPages: number;
};

// 保存用フォーム状態
export type CheerFormState = {
  text: string;
  cheerTypeId: number | "";  // 型名一貫性のため camelCase
  muscleId: number | "";
  poseId: number | "";
  imageUrl?: string | null;
  keyword?: string | null;
  cheerMode: "manual" | "ai" | "image_ai";
};

// 掛け声AI生成リクエスト（テキスト版）
export type CheerGenerateRequest = {
  cheer_type?: string;
  muscle?: string;
  pose?: string;
  keyword?: string;
};

// 掛け声AI生成リクエスト（画像版）
export type CheerGenerateByImageRequest = {
  image_url: string;
  cheer_type?: string;
  muscle?: string;
  pose?: string;
  keyword?: string;
};

// 掛け声AI生成レスポンス
export type CheerGenerateResponse = {
  result: string; // 生成された掛け声テキスト
  error?: string; // エラー発生時のみ
};

