// lib/server/fetchWithAuthServer.ts
// サーバーサイド用の共通fetchラッパー（JWT自動付与）
// この関数は、Clerkの認証セッションから安全にJWT（アクセストークン）を取得し、
// APIリクエストに Authorization ヘッダーとして自動で付与
// fetchのたびに手動でトークンを取得・設定する手間を省き、すべてのAPI通信において認証が統一的かつ安全に行えるようになります。
import { auth } from "@clerk/nextjs/server";

export async function fetchWithAuthServer(input: RequestInfo, init?: RequestInit) {
  // Clerkが現在のセッション情報をオブジェクトで取得（ユーザーがログインしている場合のみ）
  const session = await auth();
  // セッションに紐づく最新のJWT（アクセストークン=getToken）を取得
  // ※トークンが期限切れの場合はClerkが自動で再発行してくれる
  const token = await session.getToken();
  // 認証付きのAPIリクエストを実行
  // - Authorizationヘッダーに Bearer <token> をセット
  // - その他のinitヘッダーとマージ
  // - cache: "no-store" でサーバー側のレスポンスキャッシュを無効化
  return fetch(input, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
}
