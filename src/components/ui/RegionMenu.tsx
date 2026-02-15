export default function RegionMenu({
  selectedRegion,
  setSelectedRegion,
}: {
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
}) {
  const regions = ["Whole", "Beak", "Head", "Wings", "Breast", "Belly", "Back", "Feet", "Tail"];

  return (
    <div className="flex flex-col gap-1">
      {regions.map((r) => (
        <button
          key={r}
          type="button"
          onClick={() => setSelectedRegion(r)}
          className={r === selectedRegion ? "region-btn region-btn-active" : "region-btn"}
        >
          <div className="flex items-center justify-between">
            <span>{r}</span>
            <span className={r === selectedRegion ? "text-lime-300" : "text-white/25"}>›</span>
          </div>
        </button>
      ))}
    </div>
  );
}
