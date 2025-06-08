// lib/utils/getBaseUrl.ts
//柔軟なAPIベースURL解決ユーティリティ

export function getBaseUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (typeof window !== "undefined") {
    // ブラウザ側：本番URLがあればそれを優先、なければローカル用
    return apiUrl ?? "http://localhost:3000";
  }

  // SSR側：本番URLがあればそれを優先、なければBACKEND_URL→デフォルト
  return apiUrl ?? backendUrl;
}
