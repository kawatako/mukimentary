// frontend/app/cheers/page.tsx
import { getCheers, deleteCheer } from "@/lib/server/cheers";
import { getCheerPresets } from "@/lib/server/cheerPresets";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { Cheer } from "@/lib/types/cheer";
import CheersList from "@/components/cheer/list/CheersList";
import CheersFilter from "@/components/cheer/filter/CheersFilter";
import { AdBanner } from "@/components/ads/AdBanner";
import { FloatingCreateButton } from "@/components/cheer/ui/FloatingCreateButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/Pagination";

interface Props {
  searchParams: Promise<Record<string, string | string[]>>;
}

export default async function CheersPage({ searchParams }: Props) {
  const { userId } = await auth();
  const resolvedSearchParams = await searchParams;

  let cheers: Cheer[] = [];
  let totalPages = 1;

  const page = Number(resolvedSearchParams.page ?? 1);

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

  const poseIds = poseParam ? poseParam.split(",").map(Number) : [];
  const muscleIds = muscleParam ? muscleParam.split(",").map(Number) : [];

  const { muscles, poses } = await getCheerPresets();

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
          <CheersList
            cheers={cheers}
            totalPages={totalPages}
            currentPage={page}
            onDelete={async (id: number) => {
              "use server";
              await deleteCheer(id);
              redirect("/cheers");
            }}
          />
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
