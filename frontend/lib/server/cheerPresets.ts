// frontend/lib/server/cheerPresets.ts
import type { CheerType, Muscle, Pose } from "@/lib/types/prests"

// プリセット一括取得
export async function getCheerPresets(token: string): Promise<{
  cheerTypes: CheerType[];
  muscles: Muscle[];
  poses: Pose[];
}> {
  const [cheerTypes, muscles, poses] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cheer_types`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }).then(r => r.json()),
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/muscles`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }).then(r => r.json()),
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/poses`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }).then(r => r.json()),
  ]);
  return { cheerTypes, muscles, poses };
}

