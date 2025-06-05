// front/lib/api/aiLimit.ts

//環境に応じたAPIベースURLを設定
const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

//api/v1/cheers/generate_count?kind=text_ai or image_ai
//現在の残り回数・シェア済か取得API
export async function getAiLimit(kind: "text_ai" | "image_ai") {
  const res = await fetch(`${API_BASE}/api/v1/cheers/generate_count?kind=${kind}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("取得に失敗しました");
  return await res.json() as { remaining: number, can_share: boolean };
}

//POST /api/v1/cheers/share_bonus{ kind: "text_ai" or "image_ai" }
//シェアボーナス（+1回）を付与API
export async function postShareBonus(kind: "text_ai" | "image_ai") {
  const res = await fetch(`${API_BASE}/api/v1/cheers/share_bonus`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind }),
    credentials: "include",
  });
  if (!res.ok) throw new Error("ボーナス付与に失敗しました");
  return await res.json();
}