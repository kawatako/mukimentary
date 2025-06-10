// frontend/app/profile/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/clerk-sdk-node";

export default async function ProfileRedirectPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await clerkClient.users.getUser(userId);
  const username = user.username;

  if (!username) {
    redirect("/sign-in");
  }

  redirect(`/profile/${username}`);
}
