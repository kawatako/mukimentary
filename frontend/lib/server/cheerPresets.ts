// frontend/lib/server/cheerPresets.ts
export type CheerType = {
  id: number;
  name: string;
  description: string;
  position: number;
};
export type Muscle = {
  id: number;
  name: string;
  description: string;
  position: number;
};
export type Pose = {
  id: number;
  name: string;
  description: string;
  position: number;
};

export async function getCheerPresets() {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
  const [cheerTypes, muscles, poses] = await Promise.all([
    fetch(`${API_BASE_URL}/api/v1/cheer_types`, { cache: "force-cache" }).then(
      (r) => r.json()
    ),
    fetch(`${API_BASE_URL}/api/v1/muscles`, { cache: "force-cache" }).then(
      (r) => r.json()
    ),
    fetch(`${API_BASE_URL}/api/v1/poses`, { cache: "force-cache" }).then((r) =>
      r.json()
    ),
  ]);
  return { cheerTypes, muscles, poses };
}


