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
  selectedFeatures: Record<
    string,
    { name: string; prompt: string; region: string; feature: string }
  >;
  onSelectFeature: (
    key: string,
    value: { name: string; prompt: string; region: string; feature: string }
  ) => void;
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
        const selected = selectedFeatures[key];

        return (
          <section key={key}>
            <div className="flex items-center justify-between gap-3 mb-3">
              <div>
                <div className="section-title">{featureName}</div>

                <div className="text-xs text-white/50 mt-1">
                  {selected ? `Selected: ${selected.name}` : "Pick one option"}
                </div>
              </div>

              {selected && (
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
                  icon={value.icon}
                  color={value.color}
                  selected={selected?.name === value.name}
                  onClick={() =>
                    onSelectFeature(key, {
                      name: value.name,
                      prompt: value.prompt,
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