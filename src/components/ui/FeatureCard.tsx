import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

export default function FeatureCard({
  name,
  icon: Icon,
  color,
  selected,
  onClick,
}: {
  name: string;
  icon: LucideIcon;
  color?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={selected ? "feature-card feature-card-selected" : "feature-card"}
    >
      <div className="feature-card-glow" />

      {selected && (
        <div className="feature-check">
          <Check size={15} strokeWidth={4} />
        </div>
      )}

      <div className="feature-iconWrap">
        <Icon
          size={38}
          strokeWidth={2.4}
          style={{
            color: color || "#d8dee9",
            stroke: color || "#d8dee9",
          }}
        />
      </div>

      <div className="feature-caption">
        <div className="feature-titleText">{name}</div>
      </div>
    </button>
  );
}