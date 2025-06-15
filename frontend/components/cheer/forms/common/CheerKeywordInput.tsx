//frontend/components/cheer/forms/common/CheerKeywordInput.tsx
// フリワード入力用

"use client";

import React from "react";

/**
 * CheerKeywordInput コンポーネントに渡す props の型定義
 */
type Props = {
  /** フィールドのラベルに表示するテキスト（例：フリーワード） */
  label?: string;

  /** 現在のキーワード入力値（最大50文字） */
  value: string;

  /** 入力値が変更されたときに呼ばれるコールバック関数 */
  onChange: (value: string) => void;

  /** プレースホルダーとして表示するテキスト（省略可能） */
  placeholder?: string;
};

/**
 * 掛け声のキーワード入力欄
 * - 任意入力
 * - 最大50文字
 * - フォーム共通化用のシンプルな再利用コンポーネント
 */
export function CheerKeywordInput({
  label = "フリーワード（任意）",
  value,
  onChange,
  placeholder = "例：流行語・アニメ名 など",
}: Props) {
  return (
    <div className="space-y-1">
      {/* ラベル表示 */}
      <label className="text-sm font-medium text-muted-foreground">
        {label}
      </label>

      {/* テキスト入力フィールド */}
      <input
        type="text"
        maxLength={50}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        placeholder={placeholder}
      />

      {/* 現在の文字数 */}
      <p className="text-xs text-muted-foreground text-right">
        {value.length}/50文字
      </p>
    </div>
  );
}
