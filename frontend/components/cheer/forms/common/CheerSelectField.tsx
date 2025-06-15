//frontend/components/cheer/forms/common/CheerSelectField.tsx
// セレクト共通（タイプ・筋肉・ポーズ）

"use client";

import React from "react";

/**
 * セレクトボックスの選択肢として使う型
 * 例：筋肉・ポーズ・タイプ など
 */
export type Option = {
  value: number | "";
  label: string;
};

/**
 * CheerSelectField コンポーネントのProps（引数）
 */
type Props = {
  /** ラベルとして表示するテキスト（例：「筋肉部位」など） */
  label: string;
  /** 現在の選択値（id or 空文字） */
  value: number | "";
  /** 選択が変わったときに呼ばれる関数 */
  onChange: (value: number | "") => void;
  /** 選択肢の一覧（Option型の配列） */
  options: Option[];
  /** 未選択時に表示するプレースホルダー（省略可） */
  placeholder?: string;
};

/**
 * 汎用的なセレクトボックス（筋肉・ポーズ・タイプ用）
 */
export function CheerSelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "選択してください",
}: Props) {
  return (
    <div className='space-y-1'>
      {/* ラベル表示 */}
      <label className='text-sm font-medium text-muted-foreground'>
        {label}
      </label>

      {/* セレクトボックス本体 */}
      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value === "" ? "" : Number(e.target.value))
        }
        className='w-full rounded-lg border border-input bg-white px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring'
      >
        {/* 初期表示用の空オプション */}
        <option value=''>{placeholder}</option>

        {/* options 配列を使って選択肢を並べる */}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
