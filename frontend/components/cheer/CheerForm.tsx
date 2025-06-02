// frontend/components/cheer/CheerForm.tsx
import { useState } from "react";
import CheerTypeSelect from "@/components/presets/CheerTypeSelect";
import MuscleSelect from "@/components/presets/MuscleSelect";
import PoseSelect from "@/components/presets/PoseSelect";

// フォームの初期値型
type CheerFormState = {
  text: string;
  cheerTypeId: number | "";
  muscleId: number | "";
  poseId: number | "";
};

// フォーム送信イベントで親に渡したい場合など（onSubmitをpropsに追加してもOK）
type Props = {
  onSubmit?: (form: CheerFormState) => void;
};

export default function CheerForm({ onSubmit }: Props) {
  const [form, setForm] = useState<CheerFormState>({
    text: "",
    cheerTypeId: "",
    muscleId: "",
    poseId: "",
  });
  const [error, setError] = useState<string | null>(null);

  // 入力変更ハンドラ
  const handleChange = <K extends keyof CheerFormState>(key: K, value: CheerFormState[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  // フォーム送信ハンドラ
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 簡易バリデーション
    if (!form.text || form.text.length > 20) {
      setError("掛け声テキストは1〜20字で入力してください");
      return;
    }
    if (!form.cheerTypeId || !form.muscleId || !form.poseId) {
      setError("すべての項目を選択してください");
      return;
    }
    setError(null);

    // （API呼び出しや親へのonSubmitなど）
    if (onSubmit) {
      onSubmit(form);
    } else {
      alert(JSON.stringify(form, null, 2));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-xl bg-white shadow-md max-w-lg mx-auto">
      <h2 className="text-lg font-bold">掛け声を作成</h2>
      <div>
        <label className="block font-semibold">掛け声テキスト（20字以内）</label>
        <input
          type="text"
          value={form.text}
          maxLength={20}
          onChange={e => handleChange("text", e.target.value)}
          className="border rounded px-2 py-1 w-full"
          placeholder="例：その背中、翼のようだ！"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">タイプ</label>
        <CheerTypeSelect value={form.cheerTypeId} onChange={val => handleChange("cheerTypeId", val)} />
      </div>
      <div>
        <label className="block font-semibold">筋肉部位</label>
        <MuscleSelect value={form.muscleId} onChange={val => handleChange("muscleId", val)} />
      </div>
      <div>
        <label className="block font-semibold">ポーズ</label>
        <PoseSelect value={form.poseId} onChange={val => handleChange("poseId", val)} />
      </div>
      {error && <div className="text-red-600">{error}</div>}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-800 text-white font-bold px-6 py-2 rounded mt-2"
      >
        保存
      </button>
    </form>
  );
}
