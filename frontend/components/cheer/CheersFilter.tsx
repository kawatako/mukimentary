// components/cheer/CheersFilter.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MultiSelectPopover } from "./MultiSelectPopover";
import { Tag } from "./Tag";
import { Button } from "@/components/ui/button";

interface FilterOption {
  id: number;
  name: string;
}

interface Props {
  muscles: FilterOption[];
  poses: FilterOption[];
}

export default function CheersFilter({ muscles, poses }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedMuscles, setSelectedMuscles] = useState<number[]>([]);
  const [selectedPoses, setSelectedPoses] = useState<number[]>([]);

  useEffect(() => {
    const m = searchParams.get("muscle")?.split(",").map(Number) || [];
    const p = searchParams.get("pose")?.split(",").map(Number) || [];
    setSelectedMuscles(m);
    setSelectedPoses(p);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedMuscles.length > 0) params.set("muscle", selectedMuscles.join(","));
    if (selectedPoses.length > 0) params.set("pose", selectedPoses.join(","));
    router.push(`/cheers?${params.toString()}`);
  };

  const removeMuscle = (id: number) => setSelectedMuscles(selectedMuscles.filter((m) => m !== id));
  const removePose = (id: number) => setSelectedPoses(selectedPoses.filter((p) => p !== id));
  const resetAll = () => {
    setSelectedMuscles([]);
    setSelectedPoses([]);
    router.push("/cheers");
  };

  const idToName = (id: number, list: FilterOption[]) => list.find((i) => i.id === id)?.name || "";

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div className="flex flex-wrap gap-4">
        <MultiSelectPopover
          label="部位で絞り込む"
          options={muscles}
          selectedIds={selectedMuscles}
          onChange={setSelectedMuscles}
        />
        <MultiSelectPopover
          label="ポーズで絞り込む"
          options={poses}
          selectedIds={selectedPoses}
          onChange={setSelectedPoses}
        />
        <Button type="submit">絞り込む</Button>
      </div>

      {(selectedMuscles.length > 0 || selectedPoses.length > 0) && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedMuscles.map((id) => (
            <Tag key={`m-${id}`} label={`部位: ${idToName(id, muscles)}`} onRemove={() => removeMuscle(id)} />
          ))}
          {selectedPoses.map((id) => (
            <Tag key={`p-${id}`} label={`ポーズ: ${idToName(id, poses)}`} onRemove={() => removePose(id)} />
          ))}
          <Button variant="ghost" size="sm" onClick={resetAll} type="button">
            すべてクリア
          </Button>
        </div>
      )}
    </form>
  );
}
