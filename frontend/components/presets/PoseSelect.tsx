// frontend/components/presets/PoseSelect.tsx
import { usePoses } from "@/lib/hooks/useCheerPresets";

type Pose = {
  id: number;
  name: string;
  description: string;
  position: number;
};

type Props = {
  value: number | "";
  onChange: (id: number | "") => void;
};

export default function PoseSelect({ value, onChange }: Props) {
  const { data, isLoading } = usePoses();
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
      <option value="">ポーズを選択</option>
      {data.map((pose: Pose) => (
        <option key={pose.id} value={pose.id}>
          {pose.name}（{pose.description}）
        </option>
      ))}
    </select>
  );
}
