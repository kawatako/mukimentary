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

//フォーム内部で扱う状態（選択中の項目やキーワード）
export type FormState = {
  cheerTypeId: number | "";  // 選択中の掛け声タイプID（未選択は空文字）
  muscleId: number | "";     // 選択中の筋肉ID（未選択は空文字）
  poseId: number | "";       // 選択中のポーズID（未選択は空文字）
  keyword: string;           // フリーワード入力
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

// 掛け声マイリスト系
//マイリストの型
export type MyList = {
  id: number;
  name: string;
  user_id: number;
  created_at: string;
  updated_at: string;
};

// マイリスト内の掛け声アイテムの型
export type MyListCheerItem = Cheer & {
  itemId: number; // cheer_list_items.id に相当
};