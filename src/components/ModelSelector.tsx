import type { ModelType } from "../api/generateBirdImage";

export default function ModelSelector({
  value,
  onChange,
}: {
  value: ModelType;
  onChange: (value: ModelType) => void;
}) {
  return (
    <div className="species-picker">
      <select
        className="species-trigger"
        value={value}
        onChange={(e) => onChange(e.target.value as ModelType)}
      >
        <option value="lora">LoRA</option>
        <option value="sd35">SD 3.5</option>
        <option value="dreambooth">DreamBooth</option>
      </select>
    </div>
  );
}