// lib/utils/getBaseUrl.ts
//柔軟なAPIベースURL解決ユーティリティ

export function getBaseUrl() {
  // ブラウザの場合（== "外部から"アクセス。開発/本番両方あり得る）
  if (typeof window !== "undefined") {
    // まず本番URLが定義されていればそちら優先
    if (process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL) {
      return process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL;
    }
    // なければローカル（開発用APIサーバを直接叩く）
    return "http://localhost:3000";
  }
  // SSRやAPI Routesなどサーバサイド（Docker Composeで動く想定）
  return process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://backend:3000";
}
