// frontend/app/profile/[username]/page.tsx

import { notFound } from "next/navigation";
import { Metadata } from "next";

type PageProps = {
  params: {
    username: string;
  };
};

// 任意：SEO向けメタデータ
export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  return {
    title: `${params.username} のプロフィール`,
  };
};

export default function UserProfilePage({ params }: PageProps) {
  const { username } = params;

  if (!username) {
    notFound();
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">{username} さんのプロフィール</h1>
      <p className="text-muted-foreground text-sm">
        このページは現在準備中です。近日中に Machogram 投稿やプロフィール情報を表示予定です 💪
      </p>
    </div>
  );
}
