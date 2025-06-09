// app/profile/[username]/page.tsx
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type PageProps = {
  params: {
    username: string;
  };
};

export default async function UserProfilePage({ params }: PageProps) {
  const { username } = params;

  // バリデーション（空や不正な場合）
  if (!username || typeof username !== "string") {
    notFound();
  }

  // 必要に応じてRails APIからユーザー存在チェック（例）
  // const res = await fetch(`${process.env.API_BASE_URL}/api/v1/users/${username}`, { cache: "no-store" });
  // if (!res.ok) notFound();
  // const user = await res.json();

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">{username} さんのプロフィール</h1>
      <p className="text-muted-foreground text-sm">
        このページは現在準備中です。近日中に Machogram 投稿やプロフィール情報を表示予定です 💪
      </p>
    </div>
  );
}
