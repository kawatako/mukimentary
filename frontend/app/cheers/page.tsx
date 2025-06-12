//fronend/app/cheers/page.tsx
import { getCheers, deleteCheer } from "@/lib/server/cheers";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { Cheer } from "@/lib/types/cheer";
import CheersList from "@/components/cheer/CheersList";
import { AdBanner } from "@/components/ads/AdBanner";
import { FloatingCreateButton } from "@/components/cheer/FloatingCreateButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CheersPage() {
  const { userId } = await auth();

  let cheers: Cheer[] = [];

  // ログイン済みのときだけ取得
  if (userId) {
    cheers = await getCheers();
  }

  async function handleDelete(id: number) {
    "use server";
    await deleteCheer(id);
    redirect("/cheers");
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 pb-28 relative">
      <h1 className="text-xl font-bold text-foreground mb-6 text-center">マイ掛け声ライブラリ</h1>

      {userId ? (
        <CheersList cheers={cheers} onDelete={handleDelete} />
      ) : (
        <div className="text-center text-muted-foreground mt-10 space-y-4">
          <p>掛け声を作成・保存するにはログインが必要です。</p>
          <Link href="/sign-in">
            <Button variant="default" className="rounded-xl px-5 py-2 text-base">ログインして始める</Button>
          </Link>
        </div>
      )}

      <div className="mt-6">
        <AdBanner />
      </div>

      {/* ログイン済みのときだけ作成ボタンを表示 */}
      {userId && <FloatingCreateButton />}
    </div>
  );
}
