// frontend/lib/server/cheers.ts
import "server-only";
import { Cheer, CheerFormState } from "@/lib/types/cheer";
import { fetchWithAuthServer } from "@/lib/server/fetchWithAuthServer";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";

// 一覧取得（SSR/Server Action用）
export async function getCheers(): Promise<Cheer[]> {
  const API_BASE = getBaseUrl();
  const res = await fetchWithAuthServer(`${API_BASE}/api/v1/cheers`);
  if (!res.ok) throw new Error("cheers取得に失敗しました");
  return res.json();
}

// 作成
export async function createCheer(data: CheerFormState) {
  const API_BASE = getBaseUrl();
  const res = await fetchWithAuthServer(`${API_BASE}/api/v1/cheers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cheer: {
        text: data.text,
        cheer_type_id: data.cheerTypeId,
        muscle_id: data.muscleId,
        pose_id: data.poseId,
        cheer_mode: "manual",
      }
    }),
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error("cheer作成失敗:", errorText);
    throw new Error("cheer作成に失敗しました");
  }
  return res.json();
}

// 掛け声1件取得
export async function getCheerById(id: number) {
  const API_BASE = getBaseUrl();
  const res = await fetchWithAuthServer(`${API_BASE}/api/v1/cheers/${id}`);
  if (!res.ok) throw new Error("cheer取得に失敗しました");
  return res.json();
}

// 更新
export async function updateCheer(id: number, data: CheerFormState) {
  const API_BASE = getBaseUrl();
  const res = await fetchWithAuthServer(`${API_BASE}/api/v1/cheers/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cheer: {
        text: data.text,
        cheer_type_id: data.cheerTypeId,
        muscle_id: data.muscleId,
        pose_id: data.poseId,
        cheer_mode: "manual", // or data.cheer_mode
      }
    }),
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error("cheer更新失敗:", errorText);
    throw new Error("cheer更新に失敗しました");
  }
  return res.json();
}

// 削除
export async function deleteCheer(id: number) {
  const API_BASE = getBaseUrl();
  const res = await fetchWithAuthServer(`${API_BASE}/api/v1/cheers/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error("cheer削除失敗:", errorText);
    throw new Error("cheer削除に失敗しました");
  }
  return true;
}
