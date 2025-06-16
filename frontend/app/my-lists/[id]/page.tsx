// app/my-lists/[id]/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getCheersByMyListId,
  getMyLists,
  deleteCheerFromMyList,
} from "@/lib/server/cheers_my_lists";
import { MyListCheerDisplayController } from "@/components/cheer/mylist/MyListCheerDisplayController";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { MyList, MyListCheerItem } from "@/lib/types/cheer";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MyListDetailPage({ params }: Props) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { id } = await params;
  const listId = Number(id);

  // 🔍 自分のマイリスト一覧を取得
  const myLists: MyList[] = await getMyLists();
  const targetList = myLists.find((list) => list.id === listId);

  if (!targetList) {
    return (
      <div className="max-w-xl mx-auto px-4 py-8 text-center text-muted-foreground">
        <p>指定されたマイリストは存在しません。</p>
        <Link href="/my-lists">
          <Button className="mt-4">マイリスト一覧に戻る</Button>
        </Link>
      </div>
    );
  }

  // 💬 マイリスト内の掛け声＋itemIdを取得
  const cheers: MyListCheerItem[] = await getCheersByMyListId(listId);

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-bold text-center">{targetList.name}</h1>

      {cheers.length === 0 ? (
        <p className="text-center text-muted-foreground">
          このリストには掛け声が登録されていません。
        </p>
      ) : (
        <MyListCheerDisplayController
          cheers={cheers}
          onDelete={async (itemId: number) => {
            "use server";
            await deleteCheerFromMyList(listId, itemId);
            redirect(`/my-lists/${listId}`);
          }}
        />
      )}
    </div>
  );
}
