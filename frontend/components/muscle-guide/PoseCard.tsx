// components/muscle-guide/PoseCard.tsx

import Image from "next/image";
import type { Pose } from "@/lib/types/muscle-guide";

type Props = {
  pose: Pose;
};

export function PoseCard({ pose }: Props) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
      <Image
        src={pose.image}
        alt={pose.name}
        width={400}
        height={300}
        className="w-full aspect-[4/3] object-contain bg-white"
      />
      <div className="p-4 space-y-1 text-sm">
        <h3 className="font-bold text-base text-foreground">{pose.name}</h3>
        <p className="text-muted-foreground">{pose.description}</p>
      </div>
    </div>
  );
}
