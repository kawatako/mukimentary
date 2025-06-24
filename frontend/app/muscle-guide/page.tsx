// app/muscle-guide/page.tsx
import { TabSwitcher } from "@/components/muscle-guide/TabSwitcher";

export const dynamic = "force-static";

export default function MuscleGuidePage() {
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-bold text-foreground">マッスルガイド</h1>
      <TabSwitcher />
    </div>
  );
}
