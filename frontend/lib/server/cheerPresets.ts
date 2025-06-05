// frontend/lib/server/cheerPresets.ts
import { fetchWithAuthServer } from "@/lib/server/fetchWithAuthServer";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";
import type { CheerType, Muscle, Pose } from "@/lib/types/prests";

// プリセット一括取得（サーバー専用 fetchWithAuthServer を利用）
export async function getCheerPresets(): Promise<{
  cheerTypes: CheerType[];
  muscles: Muscle[];
  poses: Pose[];
}> {
  const API_BASE = getBaseUrl();
  const [cheerTypes, muscles, poses] = await Promise.all([
    fetchWithAuthServer(`${API_BASE}/api/v1/cheer_types`).then(r => r.json()),
    fetchWithAuthServer(`${API_BASE}/api/v1/muscles`).then(r => r.json()),
    fetchWithAuthServer(`${API_BASE}/api/v1/poses`).then(r => r.json()),
  ]);
  return { cheerTypes, muscles, poses };
}
