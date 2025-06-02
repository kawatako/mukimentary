// frontend/components/presets/CheerTypeSelect.tsx
import { useCheerTypes } from "@/lib/hooks/useCheerPresets";

type CheerType = {
  id: number;
  name: string;
  description: string;
  position: number;
};

type Props = {
  value: number | ""; // 初期値未選択のときは空文字にする想定
  onChange: (id: number | "") => void;
};

export default function CheerTypeSelect({ value, onChange }: Props) {
  const { data, isLoading } = useCheerTypes();
  if (isLoading) return <span>読み込み中...</span>;
  if (!data) return <span>データなし</span>;
  return (
    <select
      value={value ?? ""}
      onChange={e => {
        // e.target.valueはstring型なので型変換
        const selected = e.target.value === "" ? "" : Number(e.target.value);
        onChange(selected);
      }}
    >
      <option value="">タイプを選択</option>
      {data.map((type: CheerType) => (
        <option key={type.id} value={type.id}>
          {type.name}（{type.description}）
        </option>
      ))}
    </select>
  );
}
