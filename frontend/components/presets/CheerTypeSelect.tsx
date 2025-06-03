// frontend/components/presets/CheerTypeSelect.tsx
import type { CheerType } from "@/lib/server/cheerPresets";

type Props = {
  value: number | "";
  onChange: (id: number | "") => void;
  cheerTypes: CheerType[];
};

export default function CheerTypeSelect({ value, onChange, cheerTypes }: Props) {
  return (
    <select
      value={value ?? ""}
      onChange={e => {
        const selected = e.target.value === "" ? "" : Number(e.target.value);
        onChange(selected);
      }}
    >
      <option value="">タイプを選択</option>
      {cheerTypes.map((type) => (
        <option key={type.id} value={type.id}>
          {type.name}（{type.description}）
        </option>
      ))}
    </select>
  );
}
