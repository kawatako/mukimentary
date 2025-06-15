// lib/utils/getBaseUrl.ts
//APIのベースURL（＝Rails側のURL）」を実行環境に応じて自動で切り替えるユーティリティ

export function getBaseUrl() {
  //ブラウザで実行中かチェックして、環境変数からAPIのベースURLを取得
  if (typeof window !== "undefined") {
    // NEXT_PUBLIC_API_URL が存在すればそれを使い、なければ localhost:3000 を返す（開発用のRails想定）
    return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
  }

  // サーバー側でfetchする時のURL（＝RailsにリクエストするURL） を返す
  return (
    process.env.INTERNAL_API_URL ?? // ← あれば使う（開発DockerやCIで有効、vercelでは未定義）
    process.env.NEXT_PUBLIC_API_URL ?? // ← なければこっち（Vercel本番ではこっちが使われる）
    "http://localhost:3000" // fallback
  );
}
