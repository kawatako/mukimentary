// frontend/app/cheers/page.tsx
import { getCheers, deleteCheer } from "@/lib/server/cheers";
import { getCheerPresets } from "@/lib/server/cheerPresets";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { Cheer } from "@/lib/types/cheer";
import CheersFilter from "@/components/cheer/filter/CheersFilter";
import { AdBanner } from "@/components/ads/AdBanner";
import { FloatingCreateButton } from "@/components/cheer/ui/FloatingCreateButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/Pagination";
import CheerDisplayController from "@/components/cheer/list/CheerDisplayController";

interface Props {
  searchParams: Promise<Record<string, string | string[]>>;
}

export default async function CheersPage({ searchParams }: Props) {
  const { userId } = await auth();
  //URLのクエリ情報（?以降の部分）が「オブジェクト形式」で取得
  const resolvedSearchParams = await searchParams;

  // 掛け声データの初期化
  let cheers: Cheer[] = [];
  let totalPages = 1;
  // 現在のページ番号をクエリパラメータから取得（指定がなければ1ページ目）
  const page = Number(resolvedSearchParams.page ?? 1);

  // pose（ポーズIDの配列）と muscle（筋肉IDの配列）をクエリから取得し整形する
  // クエリパラメータはstring(単数)またはstring(複数)の可能性があるので型分岐で対応
  // --- pose（ポーズID）の取得処理 ---
  // クエリが string ならそのまま、string[] なら最初の要素だけ、どちらでもない場合は空文字
  const poseParam =
    typeof resolvedSearchParams.pose === "string"
      ? resolvedSearchParams.pose
      : Array.isArray(resolvedSearchParams.pose)
        ? resolvedSearchParams.pose[0]
        : "";
  const muscleParam =
    typeof resolvedSearchParams.muscle === "string"
      ? resolvedSearchParams.muscle
      : Array.isArray(resolvedSearchParams.muscle)
        ? resolvedSearchParams.muscle[0]
        : "";
  // 取得したposeParamとmuscleParamをカンマ区切りで分割 → 数値配列に変換（例："1,2,3" → [1, 2, 3]）
  const poseIds = poseParam ? poseParam.split(",").map(Number) : [];
  const muscleIds = muscleParam ? muscleParam.split(",").map(Number) : [];
  // プリセット（筋肉部位、ポーズ）取得
  const { muscles, poses } = await getCheerPresets();
  // ログインしている場合のみ掛け声を取得
  if (userId) {
    const result = await getCheers({ page, poseIds, muscleIds });
    cheers = result.cheers;
    totalPages = result.totalPages;
  }

  return (
    <div className='max-w-xl mx-auto px-4 py-8 pb-28 relative'>
      <h1 className='text-xl font-bold text-foreground mb-6 text-center'>
        マイ掛け声ライブラリ
      </h1>

      {userId ? (
        <>
          <CheersFilter muscles={muscles} poses={poses} />

          <div className="flex justify-center gap-4 mb-4">
              <CheerDisplayController
                cheers={cheers}
                totalPages={totalPages}
                currentPage={page}
                onDelete={async (id: number) => {
                  "use server";
                  await deleteCheer(id);
                  redirect("/cheers");
                }}
              />
          </div>

          <Pagination currentPage={page} totalPages={totalPages} />
        </>
      ) : (
        <div className='text-center text-muted-foreground mt-10 space-y-4'>
          <p>掛け声を作成・保存するにはログインが必要です。</p>
          <Link href='/sign-in'>
            <Button
              variant='default'
              className='rounded-xl px-5 py-2 text-base'
            >
              ログインして始める
            </Button>
          </Link>
        </div>
      )}

      <div className='mt-6'>
        <AdBanner />
      </div>

      {userId && <FloatingCreateButton />}
    </div>
  );
}
