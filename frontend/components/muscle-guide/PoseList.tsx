// components/muscle-guide/PoseList.tsx

import { poses } from "@/lib/data/muscleGuide";
import { PoseCard } from "./PoseCard";

export function PoseList() {
  const sorted = [...poses].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {sorted.map((pose) => (
        <PoseCard key={pose.id} pose={pose} />
      ))}
    </div>
  );
}
