// components/cheer/filter/Tag.tsx
"use client";

import { X } from "lucide-react";

interface Props {
  label: string;
  onRemove: () => void;
}

export function Tag({ label, onRemove }: Props) {
  return (
    <span className="inline-flex items-center bg-muted text-sm px-2 py-1 rounded-full">
      {label}
      <button onClick={onRemove} className="ml-1 text-muted-foreground hover:text-destructive">
        <X size={14} />
      </button>
    </span>
  );
}