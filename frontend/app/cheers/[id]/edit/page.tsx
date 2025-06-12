// frontend/app/cheers/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { getCheerById } from "@/lib/server/cheers";
import { getCheerPresets } from "@/lib/server/cheerPresets";
import EditCheerForm from "@/components/cheer/EditCheerForm";
import { updateCheer } from "@/lib/server/cheers";
import type { CheerFormState } from "@/lib/types/cheer";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditCheerPage({ params }: Props) {
  const cheerId = Number(params.id);
  const cheer = await getCheerById(cheerId);
  const { cheerTypes, muscles, poses } = await getCheerPresets();

  if (!cheer) return notFound();

  async function handleSubmit(form: CheerFormState) {
    "use server";
    await updateCheer(cheerId, form);
  }

  return (
    <div className="w-full max-w-lg mx-auto py-8">
      <h1 className="text-xl font-bold mb-4">掛け声の編集</h1>
      <EditCheerForm
        cheerId={cheer.id}
        cheerTypes={cheerTypes}
        muscles={muscles}
        poses={poses}
        initialForm={{
          text: cheer.text,
          cheerTypeId: cheer.cheer_type_id,
          muscleId: cheer.muscle_id,
          poseId: cheer.pose_id,
          cheerMode: cheer.cheer_mode
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
