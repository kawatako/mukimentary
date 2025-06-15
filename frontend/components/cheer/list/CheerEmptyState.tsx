// frontend/components/cheer/list/CheerEmptyState.tsx
// 掛け声がまだ登録されていない場合の空状態コンポーネント

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CheerEmptyState() {
  return (
    <div className='text-center text-muted-foreground mt-10 space-y-6'>
      <p className='text-lg font-semibold text-foreground'>
        まだ掛け声が登録されていません。
      </p>
      <p>このページではあなたの掛け声の一覧を保存・編集できます。</p>

      <div className='bg-accent/20 p-4 rounded-xl text-left space-y-3 max-w-md mx-auto text-sm'>
        <p className='font-medium'>📝 掛け声の作成モードは3つあります</p>

        <div className='space-y-2'>
          <div>
            <p className='font-semibold'>Manualモード</p>
            <p className='text-muted-foreground'>
              自分の言葉で自由に掛け声を登録
            </p>
          </div>
          <div>
            <p className='font-semibold'>AIモード</p>
            <p className='text-muted-foreground'>
              筋肉・ポーズ・キーワードからAIが自動生成
            </p>
          </div>
          <div>
            <p className='font-semibold'>画像AIモード</p>
            <p className='text-muted-foreground'>
              画像からAIがユニークな掛け声を提案
            </p>
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <Link href='/cheers/create'>
          <Button variant='default' className='rounded-xl px-5 py-2 text-base'>
            まずは掛け声を作ってみる
          </Button>
        </Link>
      </div>
    </div>
  );
}
