// components/muscle-guide/MuscleCard.tsx

import Image from "next/image";
import type { Muscle } from "@/lib/types/muscle-guide";

type Props = {
  muscle: Muscle;
};

export function MuscleCard({ muscle }: Props) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
      <Image
        src={muscle.image}
        alt={muscle.name}
        width={400}
        height={300}
        className="w-full aspect-[4/3] object-contain bg-white"
      />
      <div className="p-4 space-y-1 text-sm">
        <h3 className="font-bold text-base text-foreground">{muscle.name}</h3>
        <p className="text-muted-foreground">{muscle.description}</p>
      </div>
    </div>
  );
}
