//frontend/lib/server/cheers_my_lists.ts
import "server-only";
import { fetchWithAuthServer } from "@/lib/server/fetchWithAuthServer";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";
import type { Cheer,MyList,MyListCheerItem } from "@/lib/types/cheer";

type CheerListItem = {
  id: number;
  cheer_id: number;
  position: number;
  cheer: Cheer;
};

// 自分のマイリスト一覧を取得
export async function getMyLists(): Promise<MyList[]> {
  const API_BASE = getBaseUrl();
  const res = await fetchWithAuthServer(`${API_BASE}/api/v1/cheer_my_lists`);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("マイリスト一覧取得失敗:", errorText);
    throw new Error("マイリスト一覧の取得に失敗しました");
  }

  return res.json();
}

// マイリストを新規作成する
export async function createMyList(name: string): Promise<MyList> {
  const API_BASE = getBaseUrl();

  const res = await fetchWithAuthServer(
    `${API_BASE}/api/v1/cheer_my_lists`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("マイリスト作成失敗:", text);
    throw new Error("マイリストの作成に失敗しました");
  }

  const data = await res.json();
  return data as MyList;
}

// マイリスト名を更新する関数はserver側では読み込めないので削除
// export async function updateMyListName(id: number, name: string): Promise<MyList> {
//   const API_BASE = getBaseUrl();

//   const res = await fetchWithAuthServer(
//     `${API_BASE}/api/v1/cheer_my_lists/${id}`,
//     {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name }),
//     }
//   );

//   if (!res.ok) {
//     const text = await res.text();
//     console.error("マイリスト名の更新失敗:", text);
//     throw new Error("マイリスト名の更新に失敗しました");
//   }

//   return await res.json();
// }

// マイリストを削除する
export async function deleteMyList(id: number) {
  const API_BASE = getBaseUrl();

  const res = await fetchWithAuthServer(
    `${API_BASE}/api/v1/cheer_my_lists/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("マイリスト削除失敗:", text);
    throw new Error("マイリストの削除に失敗しました");
  }

  return true;
}


//特定のマイリストIDに紐づく掛け声一覧を取得
export async function getCheersByMyListId(listId: number): Promise<MyListCheerItem[]> {
  const API_BASE = getBaseUrl();
  const res = await fetchWithAuthServer(
    `${API_BASE}/api/v1/cheer_my_lists/${listId}/items`
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("マイリスト内掛け声取得失敗:", errorText);
    throw new Error("マイリスト内の掛け声取得に失敗しました");
  }

  const items: CheerListItem[] = await res.json();
  return items.map((item) => ({
    ...item.cheer,
    itemId: item.id, // 👈 ここで cheer_list_items.id を埋め込む
  }));
}

// マイリストから1件削除
export async function deleteCheerFromMyList(listId: number, cheerId: number) {
  const API_BASE = getBaseUrl();

  const res = await fetchWithAuthServer(
    `${API_BASE}/api/v1/cheer_my_lists/${listId}/items/${cheerId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("マイリスト削除失敗:", text);
    throw new Error("マイリストからの削除に失敗しました");
  }

  return true;
}