// frontend/app/cheers/create/page.tsx
import { cookies } from "next/headers";
import { getCheerPresets } from "@/lib/server/cheerPresets";
import { createCheer } from "@/lib/server/cheers";
import CheerTabs from "@/components/cheer/CheerTabs";
import { redirect } from "next/navigation";
import type { CheerFormState } from "@/lib/types/cheer";

export default async function CreateCheerPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("__session")?.value ?? "";
  const { cheerTypes, muscles, poses } = await getCheerPresets(token);

  async function handleSubmit(form: CheerFormState) {
    "use server";
    await createCheer(token, form);
    redirect("/cheers");
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">掛け声を作成</h2>
      <CheerTabs
        cheerTypes={cheerTypes}
        muscles={muscles}
        poses={poses}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
