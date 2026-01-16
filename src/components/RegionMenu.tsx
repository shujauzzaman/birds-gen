interface RegionMenuProps {
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
}

export default function RegionMenu({ selectedRegion, setSelectedRegion }: RegionMenuProps) {

  const regions = ["Whole","Beak","Head","Wings","Breast","Belly","Back","Feet","Tail"];

  return (
    <div>
      <div className="flex flex-col w-full gap-2">
        {regions.map((region) => (
          <button
            key={region}
            className={region === selectedRegion ? "selected-region" : "unselected-region"}
            onClick={() => setSelectedRegion(region)}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  );
}
