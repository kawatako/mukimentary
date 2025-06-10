// frontend/app/profile/[username]/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { clerkClient } from "@clerk/clerk-sdk-node";

// Next.js 15対応: paramsが非同期になった
interface Props {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: Props) {
  // paramsを解決
  const resolvedParams = await params;
  const { username } = resolvedParams;

  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    const user = await clerkClient.users.getUser(userId);
    
    // 現在のユーザーのusernameと一致するかチェック
    if (user.username !== username) {
      // 他のユーザーのプロフィールを見ようとしている場合
      notFound();
    }

    return (
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">プロフィール</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-lg">ユーザー名: {username}</p>
          <p className="text-gray-600">メール: {user.emailAddresses[0]?.emailAddress}</p>
          {/* 他のプロフィール情報を追加 */}
        </div>
      </div>
    );
  } catch (error) {
    console.error("User fetch error:", error);
    notFound();
  }
}