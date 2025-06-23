// app/muscle-guide/page.tsx
export const dynamic = "force-static";

import { PoseList } from "@/components/muscle-guide/PoseList";
import { MuscleList } from "@/components/muscle-guide/MuscleList";
import { TabSwitcher } from "@/components/muscle-guide/TabSwitcher";

export default async function MuscleGuidePage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[]>;
}) {
  const tab = searchParams?.tab === "muscle" ? "muscle" : "pose";

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-bold text-foreground">マッスルガイド</h1>
      <TabSwitcher activeTab={tab} />
      {tab === "pose" ? <PoseList /> : <MuscleList />}
    </div>
  );
}
