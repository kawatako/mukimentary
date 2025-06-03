// frontend/app/cheers/[id]/edit/page.tsx
import { cookies } from "next/headers";
import { getCheerById, getCheerPresets, updateCheer } from "@/lib/server/cheers";
import EditCheerForm from "@/components/cheer/EditCheerForm";
import { redirect, notFound } from "next/navigation";
import type { CheerFormState } from "@/lib/types/cheer";

// Next.js 15 App Router (RSC)
export default async function EditCheerPage({ params }: { params: { id: string } }) {
  // JWT取得
  const cookieStore = await cookies();
  const token = cookieStore.get("__session")?.value ?? "";

  // 掛け声データとプリセット取得
  const cheerId = Number(params.id);
  if (!cheerId || isNaN(cheerId)) return notFound();

  let cheer, presets;
  try {
    [cheer, presets] = await Promise.all([
      getCheerById(token, cheerId),
      getCheerPresets(token),
    ]);
  } catch {
    return notFound();
  }
  if (!cheer) return notFound();

  // サーバーアクション
  async function handleSubmit(form: CheerFormState) {
    "use server";
    await updateCheer(token, cheerId, form);
    redirect("/cheers");
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">掛け声を編集</h2>
      <EditCheerForm
        cheerId={cheerId}
        cheerTypes={presets.cheerTypes}
        muscles={presets.muscles}
        poses={presets.poses}
        initialForm={{
          text: cheer.text,
          cheerTypeId: cheer.cheer_type_id || "",
          muscleId: cheer.muscle_id || "",
          poseId: cheer.pose_id || "",
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
