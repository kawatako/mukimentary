// frontend/components/presets/MuscleSelect.tsx
import { useMuscles } from "@/lib/hooks/useCheerPresets";

type Muscle = {
  id: number;
  name: string;
  description: string;
  position: number;
};

type Props = {
  value: number | "";
  onChange: (id: number | "") => void;
};

export default function MuscleSelect({ value, onChange }: Props) {
  const { data, isLoading } = useMuscles();
  if (isLoading) return <span>読み込み中...</span>;
  if (!data) return <span>データなし</span>;
  return (
    <select
      value={value ?? ""}
      onChange={e => {
        const selected = e.target.value === "" ? "" : Number(e.target.value);
        onChange(selected);
      }}
    >
      <option value="">筋肉部位を選択</option>
      {data.map((muscle: Muscle) => (
        <option key={muscle.id} value={muscle.id}>
          {muscle.name}（{muscle.description}）
        </option>
      ))}
    </select>
  );
}
