// frontend/lib/hooks/useCheerApi.ts
//掛け声API & AIリミットAPIまとめクライアント専用（JWT認証トークン自動付与）

import { useAuthFetch } from "@/lib/hooks/useAuthFetch";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";
import type {
  Cheer,
  CheerGenerateRequest,
  CheerGenerateByImageRequest,
  CheerGenerateResponse,
  CheerFormState,
} from "@/lib/types/cheer";

export function useCheerApi() {
  const { fetchWithAuth } = useAuthFetch();
  const API_BASE = getBaseUrl();

  //api/v1/cheers/generate_count?kind=text_ai or image_ai
  //現在の残り回数・シェア済か取得API
  const getAiLimit = async (kind: "text_ai" | "image_ai") => {
    const res = await fetchWithAuth(`${API_BASE}/api/v1/cheers/generate_count?kind=${kind}`);
    if (!res.ok) throw new Error("取得に失敗しました");
    return await res.json() as { remaining: number; can_share: boolean };
  };

  //POST /api/v1/cheers/share_bonus{ kind: "text_ai" or "image_ai" }
  //シェアボーナス（+1回）を付与API
  const postShareBonus = async (kind: "text_ai" | "image_ai") => {
    const res = await fetchWithAuth(`${API_BASE}/api/v1/cheers/share_bonus`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind }),
    });
    if (!res.ok) throw new Error("ボーナス付与に失敗しました");
    return await res.json();
  };

  // 掛け声AI生成（テキスト）
  const generateCheer = async (data: CheerGenerateRequest): Promise<CheerGenerateResponse> => {
    const res = await fetchWithAuth(`${API_BASE}/api/v1/cheers/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("掛け声生成に失敗しました");
    return await res.json();
  };

  // 掛け声AI生成（画像）
  const generateCheerByImage = async (data: CheerGenerateByImageRequest): Promise<CheerGenerateResponse> => {
    const res = await fetchWithAuth(`${API_BASE}/api/v1/cheers/generate_by_image`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("画像AI生成に失敗しました");
    return await res.json();
  };

  // 掛け声の新規作成（保存）
  const createCheer = async (data: CheerFormState): Promise<Cheer> => {
    const res = await fetchWithAuth(`${API_BASE}/api/v1/cheers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cheer: data }),
    });
    if (!res.ok) throw new Error("掛け声の保存に失敗しました");
    return await res.json();
  };

  return {
    getAiLimit,
    postShareBonus,
    generateCheer,
    generateCheerByImage,
    createCheer,
  };
}
