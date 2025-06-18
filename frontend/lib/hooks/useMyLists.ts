// lib/hooks/useMyLists.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import type { MyList } from "@/lib/types/cheer";
import { useAuthFetch } from "@/lib/hooks/useAuthFetch";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";

export function useMyLists() {
  const [myLists, setMyLists] = useState<MyList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { fetchWithAuth } = useAuthFetch();
  const API_BASE = getBaseUrl();

  // 自分のマイリストを取得
  const fetchMyLists = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchWithAuth(`${API_BASE}/api/v1/cheer_my_lists`);
      if (!res.ok) throw new Error("マイリストの取得に失敗しました");
      const data = await res.json();
      setMyLists(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, API_BASE]);

  // マイリストを新規作成
  const createMyList = useCallback(async (name: string): Promise<MyList | null> => {
    try {
      const res = await fetchWithAuth(`${API_BASE}/api/v1/cheer_my_lists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error("マイリストの作成に失敗しました");
      const newList: MyList = await res.json();
      setMyLists((prev) => [...prev, newList]);
      return newList;
    } catch (e) {
      setError((e as Error).message);
      return null;
    }
  }, [fetchWithAuth, API_BASE]);

  // 指定マイリストにCheerを追加
  const addCheerToList = useCallback(async (listId: number, cheerId: number): Promise<boolean> => {
    try {
      const res = await fetchWithAuth(`${API_BASE}/api/v1/cheer_my_lists/${listId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cheer_id: cheerId }),
      });
      if (!res.ok) throw new Error("マイリストへの追加に失敗しました");
      return true;
    } catch (e) {
      setError((e as Error).message);
      return false;
    }
  }, [fetchWithAuth, API_BASE]);

  // 初回読み込み
  useEffect(() => {
    fetchMyLists();
  }, [fetchMyLists]);

  return {
    myLists,
    loading,
    error,
    fetchMyLists,
    createMyList,
    addCheerToList,
  };
}
