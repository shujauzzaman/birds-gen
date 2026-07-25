import {
  Bird,
  Smile,
  Crown,
  Feather,
  CircleDot,
  Footprints,
  Waves,
  Sparkles,
} from "lucide-react";

const regions = [
  { name: "Whole", icon: Bird, hint: "Body, size, main colors" },
  { name: "Beak", icon: Smile, hint: "Bill shape and color" },
  { name: "Head", icon: Crown, hint: "Crest, mask, eye details" },
  { name: "Wings", icon: Feather, hint: "Wing shape and pattern" },
  { name: "Breast", icon: CircleDot, hint: "Chest color and texture" },
  { name: "Belly", icon: CircleDot, hint: "Lower body details" },
  { name: "Back", icon: Feather, hint: "Back color and pattern" },
  { name: "Feet", icon: Footprints, hint: "Leg and feet color" },
  { name: "Tail", icon: Waves, hint: "Tail shape and style" },
];

export default function RegionMenu({
  selectedRegion,
  setSelectedRegion,
}: {
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
}) {
  return (
    <div className="region-grid">
      {regions.map((item) => {
        const active = item.name === selectedRegion;
        const Icon = item.icon;

        return (
          <button
            key={item.name}
            type="button"
            onClick={() => setSelectedRegion(item.name)}
            className={active ? "region-card region-card-active" : "region-card"}
          >
            <span className="region-card-icon">
              <Icon size={18} />
            </span>

            <span className="region-card-text">
              <strong>{item.name}</strong>
              <small>{item.hint}</small>
            </span>

            {active && <Sparkles size={15} className="region-spark" />}
          </button>
        );
      })}
    </div>
  );
}