// components/muscle-guide/MuscleList.tsx

import { muscles } from "@/lib/data/muscleGuide";
import { MuscleCard } from "./MuscleCard";

export function MuscleList() {
  const sorted = [...muscles].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {sorted.map((muscle) => (
        <MuscleCard key={muscle.id} muscle={muscle} />
      ))}
    </div>
  );
}
