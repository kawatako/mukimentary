"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthFetch } from "@/lib/hooks/useAuthFetch";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";

export function useMyListUpdater() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { fetchWithAuth } = useAuthFetch();

  const updateMyListName = async (id: number, name: string) => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${getBaseUrl()}/api/v1/cheer_my_lists/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("更新失敗");

      router.refresh(); // 一覧を再取得
    } catch  {
      alert("マイリスト名の更新に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return { updateMyListName, loading };
}
