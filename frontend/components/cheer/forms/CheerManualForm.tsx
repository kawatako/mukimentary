// frontend/components/cheer/forms/CheerManualForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheerTextInput } from "@/components/cheer/forms/common/CheerTextInput";
import { CheerSelectField } from "@/components/cheer/forms/common/CheerSelectField";
import type { CheerType, Muscle, Pose } from "@/lib/types/prests";
import type { CheerFormState } from "@/lib/types/cheer";

/**
 * このフォームコンポーネントの Props（外部から渡される値）の型定義
 */
type Props = {
  cheerTypes: CheerType[]; // 掛け声のタイプ一覧（現在は未使用だが将来的な拡張のため残す）
  muscles: Muscle[];        // 筋肉部位の一覧
  poses: Pose[];            // ポーズの一覧
  onSubmit: (form: CheerFormState) => void | Promise<void>; // フォーム送信時に実行される処理
};

/**
 * 手動で掛け声を作成するためのフォームコンポーネント
 */
export default function CheerManualForm({ muscles, poses, onSubmit }: Props) {
  /**
   * 入力されたフォームの状態（テキストや選択内容など）を管理するステート
   */
  const [form, setForm] = useState<CheerFormState>({
    text: "",
    cheerTypeId: "", // 手動では使わないが型として必要なため初期値で保持
    muscleId: "",
    poseId: "",
    cheerMode: "manual", // このフォームは手動作成なので常に "manual"
  });

  /**
   * 入力内容に関するバリデーションエラーなどを表示するためのステート
   */
  const [error, setError] = useState<string | null>(null);

  /**
   * フォームの各フィールドが変更されたときに状態を更新する関数
   * @param key - 更新するフィールド名（text, muscleId, poseIdなど）
   * @param value - 入力または選択された値
   */
  const handleChange = (key: keyof CheerFormState, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /**
   * フォームが送信されたときの処理
   * バリデーション（文字数チェック）を行い、問題なければ onSubmit を呼ぶ
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.text || form.text.length > 50) {
      setError("掛け声テキストは1〜50字で入力してください");
      return;
    }

    setError(null);
    await onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-xl shadow-sm p-5 max-w-lg mx-auto space-y-5"
    >
      <h2 className="text-xl font-bold text-center text-foreground">
        手動で掛け声を作成
      </h2>

      {/* 掛け声のテキスト入力欄 */}
      <CheerTextInput
        label="掛け声テキスト"
        value={form.text}
        onChange={(val) => handleChange("text", val)}
      />

      {/* 筋肉部位のセレクトボックス（任意） */}
      <CheerSelectField
        label="筋肉部位（任意）"
        value={form.muscleId}
        onChange={(val) => handleChange("muscleId", val)}
        options={muscles.map((m) => ({
          value: m.id,
          label: `${m.name}（${m.description}）`,
        }))}
      />

      {/* ポーズのセレクトボックス（任意） */}
      <CheerSelectField
        label="ポーズ（任意）"
        value={form.poseId}
        onChange={(val) => handleChange("poseId", val)}
        options={poses.map((p) => ({
          value: p.id,
          label: `${p.name}（${p.description}）`,
        }))}
      />

      {/* バリデーションエラー表示 */}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {/* フォーム送信ボタン */}
      <Button type="submit" className="w-full rounded-xl text-base py-2">
        保存
      </Button>
    </form>
  );
}
