// components/cheer/MultiSelectPopover.tsx
"use client";

import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Option {
  id: number;
  name: string;
}

interface Props {
  label: string;
  options: Option[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
}

export function MultiSelectPopover({ label, options, selectedIds, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const toggleId = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((v) => v !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {label} ({selectedIds.length})
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
          {options.map((opt) => (
            <label key={opt.id} className="flex items-center gap-2">
              <Checkbox
                checked={selectedIds.includes(opt.id)}
                onCheckedChange={() => toggleId(opt.id)}
              />
              {opt.name}
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
