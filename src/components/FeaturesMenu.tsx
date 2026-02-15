import FeatureCard from "./ui/FeatureCard";
import { FEATURES } from "../data/features";
import HorizontalScroller from "./ui/HorizontalScroll";

export default function FeaturesMenu({
  selectedRegion,
  selectedFeatures,
  onSelectFeature,
  onClearFeature,
}: {
  selectedRegion: string;
  selectedFeatures: Record<string, { name: string; image: string; region: string; feature: string }>;
  onSelectFeature: (key: string, value: { name: string; image: string; region: string; feature: string }) => void;
  onClearFeature: (key: string) => void;
}) {
  if (!selectedRegion) {
    return <div className="card p-6 text-white/70">Select a region to start.</div>;
  }

  const regionData = FEATURES[selectedRegion] ?? {};

  return (
    <div className="space-y-7">
      {Object.entries(regionData).map(([featureName, values]) => {
        const key = `${selectedRegion}|${featureName}`;
        const isSelected = !!selectedFeatures[key];

        return (
          <section key={key}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <h3 className="section-title">{featureName}</h3>
                <span className="chip">{isSelected ? "Selected" : "Pick one"}</span>
              </div>

              {isSelected && (
                <button
                  type="button"
                  className="text-xs text-lime-200/80 hover:text-lime-200 underline underline-offset-4"
                  onClick={() => onClearFeature(key)}
                >
                  Clear
                </button>
              )}
            </div>

            <HorizontalScroller>
              {values.map((value) => (
                <FeatureCard
                  key={value.name}
                  name={value.name}
                  image={value.image}
                  selected={selectedFeatures[key]?.name === value.name}
                  onClick={() =>
                    onSelectFeature(key, {
                      name: value.name,
                      image: value.image,
                      region: selectedRegion,
                      feature: featureName,
                    })
                  }
                />
              ))}
            </HorizontalScroller>
          </section>
        );
      })}
    </div>
  );
}
