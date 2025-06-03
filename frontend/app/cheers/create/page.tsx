// frontend/app/cheers/create/page.tsx
import { cookies } from "next/headers";
import { getCheerPresets, createCheer } from "@/lib/server/cheers";
import CheerForm from "@/components/cheer/CheerForm";
import { redirect } from "next/navigation";
import type { CheerFormState } from "@/lib/types/cheer";

// page.tsxはサーバーコンポーネント
export default async function CreateCheerPage() {
  // JWT取得
  const cookieStore = await cookies();
  const token = cookieStore.get("__session")?.value ?? "";
  console.log("token:", token); // ←ここを追加

  // プリセット値をサーバーで取得
  const { cheerTypes, muscles, poses } = await getCheerPresets(token);

  // サーバーアクション
  async function handleSubmit(form: CheerFormState) {
    "use server";
    await createCheer(token, form);
    redirect("/cheers");
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">掛け声を作成</h2>
      <CheerForm
        cheerTypes={cheerTypes}
        muscles={muscles}
        poses={poses}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
