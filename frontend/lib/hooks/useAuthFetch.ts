// frontend/lib/hooks/useAuthFetch.ts
//Clerkなどの認証システムから自動的にJWTトークン（ユーザの認証情報）を取得し、APIリクエスト時のAuthorizationヘッダーに付与
import { useAuth } from "@clerk/nextjs"; //Clerkの認証フック
import { useCallback } from "react"; //同じ関数を毎回再生成しないためのReact標準フック

export function useAuthFetch() {
  //現在ログインしているユーザーのJWTトークンを非同期で取得できる関数
  const { getToken } = useAuth();

  //第一引数：APIのURLやRequestオブジェクト、第二引数：通常のfetchオプション
  const fetchWithAuth = useCallback(
    async (input: RequestInfo, init?: RequestInit) => {
      const token = await getToken();
      return fetch(input, {
        ...init,
        headers: {
          ...(init?.headers || {}),
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
    },
    [getToken]
  );

  return { fetchWithAuth };
}
