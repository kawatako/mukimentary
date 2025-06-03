// frontend/lib/server/cheers.ts
// Next.js 15 サーバー専用fetchユーティリティ
import "server-only";
import { Cheer,CheerFormState } from "@/lib/types/cheer";

// 一覧取得（SSR/Server Action用）
export async function getCheers(token: string): Promise<Cheer[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cheers`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("cheers取得に失敗しました");
  return res.json();
}

// 作成
export async function createCheer(token: string, data: CheerFormState) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cheers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      cheer: {
        text: data.text,
        cheer_type_id: data.cheerTypeId,
        muscle_id: data.muscleId,
        pose_id: data.poseId,
        cheer_mode: "manual",
      }
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error("cheer作成失敗:", errorText);
    throw new Error("cheer作成に失敗しました");
  }
  return res.json();
}

// 掛け声1件取得
export async function getCheerById(token: string, id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cheers/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("cheer取得に失敗しました");
  return res.json();
}

// 更新(更新)
export async function updateCheer(token: string, id: number, data: CheerFormState) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cheers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      cheer: {
        text: data.text,
        cheer_type_id: data.cheerTypeId,
        muscle_id: data.muscleId,
        pose_id: data.poseId,
        cheer_mode: "manual", // or data.cheer_mode
      }
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error("cheer更新失敗:", errorText);
    throw new Error("cheer更新に失敗しました");
  }
  return res.json();
}


// 削除
export async function deleteCheer(token: string, id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cheers/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error("cheer削除失敗:", errorText);
    throw new Error("cheer削除に失敗しました");
  }
  return true;
}
