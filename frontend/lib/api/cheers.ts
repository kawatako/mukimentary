// frontend/lib/api/cheers.ts
import type {
  Cheer,
  CheerGenerateRequest,
  CheerGenerateByImageRequest,
  CheerGenerateResponse,
  CheerFormState,
} from "@/lib/types/cheer";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

// 掛け声AI生成（テキスト）
export async function generateCheer(data: CheerGenerateRequest): Promise<CheerGenerateResponse> {
  const res = await fetch(`${API_BASE}/api/v1/cheers/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return await res.json();
}

// 掛け声AI生成（画像）
export async function generateCheerByImage(data: CheerGenerateByImageRequest): Promise<CheerGenerateResponse> {
  const res = await fetch(`${API_BASE}/api/v1/cheers/generate_by_image`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return await res.json();
}

// 掛け声の新規作成（保存）
export async function createCheer(data: CheerFormState): Promise<Cheer> {
  const res = await fetch(`${API_BASE}/api/v1/cheers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cheer: data }),
    credentials: "include",
  });
  return await res.json();
}
