// frontend/components/presets/PoseSelect.tsx
import type { Pose } from "@/lib/types/prests";

type Props = {
  value: number | "";
  onChange: (id: number | "") => void;
  poses: Pose[];
};

export default function PoseSelect({ value, onChange, poses }: Props) {
  return (
    <select
      value={value ?? ""}
      onChange={e => {
        const selected = e.target.value === "" ? "" : Number(e.target.value);
        onChange(selected);
      }}
    >
      <option value="">ポーズを選択</option>
      {poses.map((pose) => (
        <option key={pose.id} value={pose.id}>
          {pose.name}（{pose.description}）
        </option>
      ))}
    </select>
  );
}
