// frontend/app/cheers/create/page.tsx
import { getCheerSamples } from "@/lib/server/cheers";
import { getCheerPresets } from "@/lib/server/cheerPresets";
import { createCheer } from "@/lib/server/cheers";
import CheerTabs from "@/components/cheer/forms/CheerTabs";
import { redirect } from "next/navigation";
import type { CheerFormState } from "@/lib/types/cheer";
import { AdBanner } from "@/components/ads/AdBanner";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CreateCheerPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className='max-w-xl mx-auto py-20 text-center text-muted-foreground space-y-4'>
        <p>掛け声を作成・保存するにはログインが必要です。</p>
        <Link href='/sign-in'>
          <Button variant='default' className='rounded-xl px-5 py-2 text-base'>
            ログインして始める
          </Button>
        </Link>
      </div>
    );
  }


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
