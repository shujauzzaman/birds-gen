import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import RegionMenu from "../components/RegionMenu";
import FeaturesMenu from "../components/FeaturesMenu";

import { buildPrompt, REQUIRED_KEYS } from "../prompt";
import {
  loadSelected,
  saveSelected,
  clearSelected,
  loadSpecies,
  saveSpecies,
  type SelectedFeatures,
} from "../storage";
import { BIRD_SPECIES } from "../data/species";

export default function GenerateBird() {
  const nav = useNavigate();

  const [selectedRegion, setSelectedRegion] = useState("Whole");
  const [selectedSpecies, setSelectedSpecies] = useState(() => loadSpecies());
  const [selectedFeatures, setSelectedFeatures] = useState<SelectedFeatures>(() =>
    loadSelected()
  );

  const hasSpecies = selectedSpecies.trim().length > 0;

  const result = useMemo(
    () => buildPrompt(selectedFeatures, selectedSpecies),
    [selectedFeatures, selectedSpecies]
  );

  useEffect(() => {
    saveSelected(selectedFeatures);
  }, [selectedFeatures]);

  useEffect(() => {
    saveSpecies(selectedSpecies);
  }, [selectedSpecies]);

  const canProceed = hasSpecies
    ? result.blockedReasons.length === 0
    : result.missing.length === 0 && result.blockedReasons.length === 0;

  const selectedCount = Object.keys(selectedFeatures).length;

  const completedRequired = REQUIRED_KEYS.filter(
    (k) => selectedFeatures[k]
  ).length;

  const onSelectFeature = (
    key: string,
    value: {
      name: string;
      prompt: string;
      region: string;
      feature: string;
    }
  ) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onClearFeature = (key: string) => {
    setSelectedFeatures((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  function handleSpeciesChange(value: string) {
    setSelectedSpecies(value);

    // Optional but recommended:
    // when species is selected, remove feature selections
    // so prompt is fully species-based.
    if (value.trim().length > 0) {
      setSelectedFeatures({});
      clearSelected();
    }
  }

  function resetAll() {
    clearSelected();
    setSelectedFeatures({});
    setSelectedSpecies("");
  }

  return (
    <div className="min-h-screen bg-hero">
      <div className="min-h-screen bg-black/55">
        <Navbar />

        <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-12 gap-4">
          <aside className="col-span-12 md:col-span-3">
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div className="font-extrabold">Bird Builder</div>

                <button className="btn-ghost" type="button" onClick={resetAll}>
                  Reset
                </button>
              </div>

              <div className="mt-4">
                <div className="text-sm font-bold mb-2">
                  Bird Species{" "}
                  <span className="text-white/40">(Optional)</span>
                </div>

                <select
                  className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-white outline-none cursor-pointer"
                  value={selectedSpecies}
                  onChange={(e) => handleSpeciesChange(e.target.value)}
                >
                  <option
                    value=""
                    style={{
                      backgroundColor: "#111",
                      color: "white",
                    }}
                  >
                    No species, use features only
                  </option>

                  {BIRD_SPECIES.map((s) => (
                    <option
                      key={s}
                      value={s}
                      style={{
                        backgroundColor: "#111",
                        color: "white",
                      }}
                    >
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {!hasSpecies && (
                <div className="mt-5">
                  <div className="text-sm font-bold mb-2">
                    Feature Regions
                  </div>

                  <RegionMenu
                    selectedRegion={selectedRegion}
                    setSelectedRegion={setSelectedRegion}
                  />
                </div>
              )}

              <div className="mt-5 rounded-xl bg-black/30 p-3">
                <div className="text-sm font-bold">Progress</div>

                <div className="mt-1 text-sm text-white/70">
                  Species: {selectedSpecies || "Optional / Not selected"}
                </div>

                {!hasSpecies && (
                  <>
                    <div className="text-sm text-white/70">
                      Features selected: {selectedCount}
                    </div>

                    <div className="text-sm text-white/70">
                      Required: {completedRequired}/{REQUIRED_KEYS.length}
                    </div>
                  </>
                )}

                {hasSpecies && (
                  <div className="text-sm text-lime-200 mt-1">
                    Species prompt ready
                  </div>
                )}
              </div>
            </div>
          </aside>

          <main className="col-span-12 md:col-span-9 min-w-0">
            <div className="card p-5 builder-main-card">
              <div className="builder-fixed-top">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-white/60 text-sm">
                      {hasSpecies ? "Selected Species" : "Currently Editing"}
                    </div>

                    <div className="text-2xl font-extrabold">
                      {hasSpecies ? selectedSpecies : selectedRegion}
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={!canProceed}
                    className={
                      canProceed
                        ? "btn-primary"
                        : "btn-ghost opacity-50 cursor-not-allowed"
                    }
                    onClick={() => nav("/prompt")}
                  >
                    Proceed to Prompt
                  </button>
                </div>

                {hasSpecies && (
                  <div className="mt-4 required-box">
                    <div className="required-title">
                      Predefined species prompt selected
                    </div>

                    <div className="required-sub mt-1">
                      You do not need to select features. Click Proceed to
                      Prompt to review and generate the bird image.
                    </div>
                  </div>
                )}

                {!hasSpecies && !canProceed && (
                  <div className="mt-4 required-box">
                    <div className="required-head">
                      <div>
                        <div className="required-title">
                          Required selections
                        </div>

                        <div className="required-sub">
                          Species is optional. Select these important features
                          for a clean AI prompt.
                        </div>
                      </div>

                      <div className="required-count">
                        {completedRequired}/{REQUIRED_KEYS.length}
                      </div>
                    </div>

                    <div className="required-chips">
                      {REQUIRED_KEYS.map((k) => {
                        const [region, feature] = k.split("|");
                        const selected = !!selectedFeatures[k];
                        const isCurrentRegion = region === selectedRegion;

                        return (
                          <button
                            key={k}
                            type="button"
                            onClick={() => setSelectedRegion(region)}
                            className={[
                              "required-chip",
                              selected
                                ? "required-chip-done"
                                : "required-chip-missing",
                              isCurrentRegion ? "required-chip-focus" : "",
                            ].join(" ")}
                          >
                            <span className="required-chip-dot" />
                            {feature}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="builder-features-scroll">
                {hasSpecies ? (
                  <div className="card p-6 text-white/80">
                    <div className="text-xl font-extrabold text-lime-200">
                      {selectedSpecies}
                    </div>

                    <p className="mt-2 text-sm text-white/60">
                      Predefined prompt is ready for this bird species. No
                      feature selection is required.
                    </p>
                  </div>
                ) : (
                  <FeaturesMenu
                    selectedRegion={selectedRegion}
                    selectedFeatures={selectedFeatures}
                    onSelectFeature={onSelectFeature}
                    onClearFeature={onClearFeature}
                  />
                )}
              </div>

              <div className="builder-prompt-footer">
                <div>
                  <div className="font-bold mb-2">Live Prompt Preview</div>
                  <div className="builder-prompt-text">
                    {result.positive}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}