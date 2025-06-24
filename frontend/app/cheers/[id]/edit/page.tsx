// frontend/app/cheers/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { getCheerById } from "@/lib/server/cheers";
import { getCheerPresets } from "@/lib/server/cheerPresets";
import EditCheerForm from "@/components/cheer/forms/EditCheerForm";
import { updateCheer } from "@/lib/server/cheers";
import type { CheerFormState } from "@/lib/types/cheer";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function EditCheerPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
const { userId } = await auth();

if (!userId) {
  return (
    <div className='max-w-xl mx-auto py-20 text-center text-muted-foreground space-y-4'>
      <p>掛け声を編集するにはログインが必要です。</p>
      <Link href='/sign-in'>
        <Button variant='default' className='rounded-xl px-5 py-2 text-base'>
          ログインして編集する
        </Button>
      </Link>
    </div>
  );
}
  const { id } = await params;
  const cheerId = Number(id);
  const cheer = await getCheerById(cheerId);
  const { muscles, poses } = await getCheerPresets();

  if (!cheer) return notFound();

  async function handleSubmit(form: CheerFormState) {
    "use server";
    await updateCheer(cheerId, form);
    redirect("/cheers");
  }

  return (
    <div className="w-full max-w-lg mx-auto py-8">
      <h1 className="text-xl font-bold mb-4">掛け声の編集</h1>
      <EditCheerForm
        cheerId={cheer.id}
        muscles={muscles}
        poses={poses}
        initialForm={{
          text: cheer.text,
          cheerTypeId: cheer.cheer_type_id || null,
          muscleId: cheer.muscle_id || null,
          poseId: cheer.pose_id || null,
          cheerMode: cheer.cheer_mode,
          imageUrl: cheer.image_url || null,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}