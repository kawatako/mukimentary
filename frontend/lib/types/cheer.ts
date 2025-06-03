// frontend/types/cheer.ts
export type Cheer = {
  id: number;
  text: string;
  cheer_type_id?: number;
  muscle_id?: number;
  pose_id?: number;
  cheer_mode: "manual" | "ai" | "image_ai";
  image_url?: string | null;
  keyword?: string | null;
  position?: number;
  created_at: string;
  updated_at: string;
  cheer_type?: { id: number; name: string; description?: string };
  muscle?: { id: number; name: string; description?: string };
  pose?: { id: number; name: string; description?: string };
};

export type CheerFormState = {
  text: string;
  cheerTypeId: number | "";
  muscleId: number | "";
  poseId: number | "";
};