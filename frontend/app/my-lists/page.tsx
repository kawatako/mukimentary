// app/my-lists/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  getMyLists,
  deleteMyList,
  createMyList,
} from "@/lib/server/cheers_my_lists";
import { MyListCard } from "@/components/cheer/mylist/MyListCard";
import CreateMyListForm from "@/components/cheer/mylist/CreateMyListForm";

export default async function MyListsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const myLists = await getMyLists();

  return (
    <div className='max-w-xl mx-auto px-4 py-8 space-y-6'>
      <h1 className='text-xl font-bold text-center text-foreground'>
        マイリスト一覧
      </h1>

      {myLists.length > 0 ? (
        <div className='space-y-2'>
          {myLists.map((list) => (
            <MyListCard
              key={list.id}
              list={list}
              onDelete={async (id: number) => {
                "use server";
                await deleteMyList(id);
                redirect("/my-lists"); // リスト削除後リロード
              }}
            />
          ))}
        </div>
      ) : (
        <p className='text-center text-muted-foreground space-y-2 text-sm leading-relaxed'>
          <span className='block'>📁 マイリストはまだ作成されていません。</span>
          <span className='block'>
            気に入った掛け声をまとめておくことで、大会や練習前にすぐ見返せます。
          </span>
          <span className='block'>
            下のフォームから、たとえば「大会用」や「元気出したい時用」などのリストを作成してみましょう。
          </span>
        </p>
      )}

      <div>
        <h2 className='font-semibold mt-6 mb-2'>新しいリストを作成</h2>
        <CreateMyListForm
          onCreate={async (name: string) => {
            "use server";
            const newList = await createMyList(name);
            if (newList) redirect(`/my-lists/${newList.id}`);
          }}
        />
      </div>

      <div className='text-center'>
        <Link href='/cheers'>
          <Button variant='outline' className='mt-6'>
            掛け声ライブラリへ戻る
          </Button>
        </Link>
      </div>
    </div>
  );
}
