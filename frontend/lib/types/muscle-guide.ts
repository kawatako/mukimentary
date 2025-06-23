//frontend/lib/types/muscle-guide
export type Pose = {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  sort_order: number;
};

export type Muscle = {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  category: "front" | "back" | "arm" | "legs";
  sort_order: number;
};
