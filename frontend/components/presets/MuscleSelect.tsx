// frontend/components/presets/MuscleSelect.tsx
import type { Muscle } from "@/lib/types/prests";

type Props = {
  value: number | "";
  onChange: (id: number | "") => void;
  muscles: Muscle[];
};

export default function MuscleSelect({ value, onChange, muscles }: Props) {
  return (
    <select
      value={value ?? ""}
      onChange={e => {
        const selected = e.target.value === "" ? "" : Number(e.target.value);
        onChange(selected);
      }}
    >
      <option value="">筋肉部位を選択</option>
      {muscles.map((muscle) => (
        <option key={muscle.id} value={muscle.id}>
          {muscle.name}（{muscle.description}）
        </option>
      ))}
    </select>
  );
}
