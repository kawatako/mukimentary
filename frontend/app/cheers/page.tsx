// frontend/app/cheers/page.tsx
import { getCheers, deleteCheer } from "@/lib/server/cheers";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CheersList from "@/components/cheer/CheersList";
import type { Cheer } from "@/lib/types/cheer";
import { redirect } from "next/navigation";

export default async function CheersPage() {
  const { userId } = await auth();
    // ここで未ログインならサインインページにリダイレクト
  if (!userId) {
    redirect("/sign-in");
  }

  //ログイン済みだけcheersを取得
  const cheers: Cheer[] = await getCheers();

  async function handleDelete(id: number) {
    "use server";
    await deleteCheer(id);
    redirect("/cheers"); // 削除後は再ロードで一覧更新
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">マイ掛け声ライブラリ</h1>
        <Link href="/cheers/create">
          <Button>掛け声を作成</Button>
        </Link>
      </div>
      <CheersList cheers={cheers} onDelete={handleDelete} />
    </div>
  );
}
