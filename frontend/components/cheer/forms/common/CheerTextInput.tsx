//frontend/components/cheer/forms/common/CheerTextInput.tsx
// フリーワード入力欄

"use client";

import React from "react";

/**
 * CheerTextInput コンポーネントに渡す props の型定義
 */
type Props = {
  /** フィールドのラベルに表示されるテキスト */
  label: string;

  /** 現在の入力値（1〜50文字） */
  value: string;

  /** 値が変更されたときに呼ばれる関数（親から渡される） */
  onChange: (value: string) => void;

  /** プレースホルダーのテキスト（省略可） */
  placeholder?: string;

  /** 入力フィールドの必須指定（省略可、デフォルトtrue） */
  required?: boolean;
};

/**
 * 掛け声テキスト用の入力フィールドコンポーネント
 * - 最大50文字
 * - バリデーションやラベル表示にも対応
 */
export function CheerTextInput({
  label,
  value,
  onChange,
  placeholder = "例：背中にでっかいジープ乗せてんのかい!!",
  required = true,
}: Props) {
  return (
    <div className="space-y-1">
      {/* ラベル（フィールド名） */}
      <label className="text-sm font-medium text-muted-foreground">
        {label}
      </label>

      {/* テキスト入力ボックス */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={50}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />

      {/* 補足：文字数上限などのガイドを追加しても良い */}
      <p className="text-xs text-muted-foreground text-right">
        {value.length}/50文字
      </p>
    </div>
  );
}
