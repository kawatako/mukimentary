// frontend/app/cheers/create/page.tsx
import { getCheerSamples } from "@/lib/server/cheers";
import { getCheerPresets } from "@/lib/server/cheerPresets";
import { createCheer } from "@/lib/server/cheers";
import CheerTabs from "@/components/cheer/list/CheerTabs";
import { redirect } from "next/navigation";
import type { CheerFormState } from "@/lib/types/cheer";
import { AdBanner } from "@/components/ads/AdBanner";

export default async function CreateCheerPage() {
  const { cheerTypes, muscles, poses } = await getCheerPresets();
  const cheerSamples = await getCheerSamples();

  async function handleSubmit(form: CheerFormState) {
    "use server";
    await createCheer(form);
    redirect("/cheers");
  }

  return (
    <div className='max-w-xl mx-auto py-8'>
      <h2 className='text-xl font-bold text-center text-foreground mb-6'>
        掛け声を作成
      </h2>
      <CheerTabs
        cheerTypes={cheerTypes}
        muscles={muscles}
        poses={poses}
        onSubmit={handleSubmit}
        cheerSamples={cheerSamples}
      />
      <AdBanner />
    </div>
  );
}
