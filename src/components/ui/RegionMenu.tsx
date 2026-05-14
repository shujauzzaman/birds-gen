import {
  Bird,
  Smile,
  Crown,
  Feather,
  CircleDot,
  Footprints,
  Waves,
} from "lucide-react";

const regions = [
  { name: "Whole", icon: Bird },
  { name: "Beak", icon: Smile },
  { name: "Head", icon: Crown },
  { name: "Wings", icon: Feather },
  { name: "Breast", icon: CircleDot },
  { name: "Belly", icon: CircleDot },
  { name: "Back", icon: Feather },
  { name: "Feet", icon: Footprints },
  { name: "Tail", icon: Waves },
];

export default function RegionMenu({
  selectedRegion,
  setSelectedRegion,
}: {
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {regions.map((item) => {
        const Icon = item.icon;
        const active = item.name === selectedRegion;

        return (
          <button
            key={item.name}
            type="button"
            onClick={() => setSelectedRegion(item.name)}
            className={active ? "region-btn region-btn-active" : "region-btn"}
          >
            <span className="flex items-center gap-2">
              <Icon size={17} />
              {item.name}
            </span>
            <span className={active ? "text-lime-300" : "text-white/25"}>›</span>
          </button>
        );
      })}
    </div>
  );
}