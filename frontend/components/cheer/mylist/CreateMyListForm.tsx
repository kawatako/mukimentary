//frontend/components/cheer/mylist/CreateMyListForm.tsx
// 新規マイリスト作成フォーム
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  onCreate: (name: string) => Promise<void>;
  disabled?: boolean;
};

export default function CreateMyListForm({ onCreate, disabled }: Props) {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) return;
    setIsSubmitting(true);
    await onCreate(name.trim());
    setIsSubmitting(false);
    setName(""); // 入力欄をリセット
  };

  return (
    <div className="space-y-2">
      <Input
        placeholder="新しいリスト名を入力"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isSubmitting || disabled}
      />
      <Button
        onClick={handleSubmit}
        className="w-full"
        disabled={isSubmitting || disabled}
      >
        {isSubmitting ? "作成中..." : "作成して追加"}
      </Button>
    </div>
  );
}
