// lib/server/fetchWithAuthServer.ts
// サーバー側（auth()でJWT取得してfetchに載せる）
import { cookies } from "next/headers";

export async function fetchWithAuthServer(input: RequestInfo, init?: RequestInit) {
  //Next.js 15のnext/headersからcookies()を呼び出し、リクエストに紐づいたCookieストアを取得。
  const cookieStore = await cookies();
  //__session というキーのCookie（＝Clerkなどの認証サービスがセットしたJWTトークン）を取得。
  const token = cookieStore.get("__session")?.value ?? ""; // Clerkなど
  //fetchの第1引数にはAPIのURLを、第2引数にはオプション（methodやbodyなど）を受け取る。
  //ヘッダーには**Authorization: Bearer <token>** を自動でセット（他のヘッダーもマージ）。
  //cache: "no-store" でキャッシュ無効（APIの最新データを取得）。
  //認証付きのAPIリクエストが毎回この関数で共通化できる。
  return fetch(input, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
}
