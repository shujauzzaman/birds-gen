import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RotateCcw, Sparkles } from "lucide-react";

import SpeciesPicker from "../components/ui/SpeciesPicker";
import Navbar from "../components/Navbar";
import RegionMenu from "../components/RegionMenu";
import FeaturesMenu from "../components/FeaturesMenu";
import ModelSelector from "../components/ModelSelector";

import { buildPrompt, REQUIRED_KEYS } from "../prompt";
import {
  loadSelected,
  saveSelected,
  clearSelected,
  loadSpecies,
  saveSpecies,
  loadModel,
  saveModel,
  type SelectedFeatures,
} from "../storage";

import { BIRD_SPECIES } from "../data/species";
import type { ModelType } from "../api/generateBirdImage";

export default function GenerateBird() {
  const nav = useNavigate();

  const [selectedRegion, setSelectedRegion] = useState("Whole");
  const [selectedSpecies, setSelectedSpecies] = useState(() => loadSpecies());
  const [selectedModel, setSelectedModel] = useState<ModelType>(() => loadModel());

  const [selectedFeatures, setSelectedFeatures] =
    useState<SelectedFeatures>(() => loadSelected());

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

  useEffect(() => {
    saveModel(selectedModel);
  }, [selectedModel]);

  const canProceed = hasSpecies
    ? result.blockedReasons.length === 0
    : result.missing.length === 0 && result.blockedReasons.length === 0;

  const selectedCount = Object.keys(selectedFeatures).length;

  const completedRequired = REQUIRED_KEYS.filter(
    (k) => selectedFeatures[k]
  ).length;

  const progress = hasSpecies
    ? 100
    : Math.round((completedRequired / REQUIRED_KEYS.length) * 100);

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

    if (value.trim().length > 0) {
      setSelectedFeatures({});
      clearSelected();
    }
  }

  function resetAll() {
    clearSelected();
    setSelectedFeatures({});
    setSelectedSpecies("");
    setSelectedRegion("Whole");
    setSelectedModel("lora");
  }

  return (
    <div className="min-h-screen bg-hero">
      <div className="min-h-screen page-overlay">
        <Navbar />

        <main className="builder-page">
          <section className="builder-hero">
            <div>
              <div className="home-kicker">LoRA Powered Bird Generator</div>

              <h1 className="builder-title">
                Design a realistic bird from visual traits
              </h1>

              <p className="builder-subtitle">
                Choose a species or build a bird from natural features. BirdsGen
                converts your selections into a clean Stable Diffusion prompt
                and generates the image using your selected model.
              </p>
            </div>

            <div className="model-pill">
              <Sparkles size={17} />
              <span>LoRA / SD 3.5 / DreamBooth</span>
            </div>
          </section>

          <div className="builder-layout">
            <aside className="builder-sidebar">
              <div className="panel">
                <div className="panel-head">
                  <div>
                    <h2>Bird Builder</h2>
                    <p>Species or feature mode</p>
                  </div>

                  <button className="icon-btn" type="button" onClick={resetAll}>
                    <RotateCcw size={17} />
                  </button>
                </div>

                <div className="field-block">
                  <label>AI Model</label>

                  <ModelSelector
                    value={selectedModel}
                    onChange={setSelectedModel}
                  />
                </div>

                <div className="field-block">
                  <label>Bird Species</label>

                  <SpeciesPicker
                    value={selectedSpecies}
                    options={BIRD_SPECIES}
                    onChange={handleSpeciesChange}
                  />

                  <p className="selector-help">
                    Choose a known species or build a realistic bird from visual
                    traits.
                  </p>
                </div>

                {!hasSpecies && (
                  <div className="field-block">
                    <label>Feature Regions</label>

                    <RegionMenu
                      selectedRegion={selectedRegion}
                      setSelectedRegion={setSelectedRegion}
                    />
                  </div>
                )}

                <div className="progress-box">
                  <div className="progress-top">
                    <span>Prompt Readiness</span>
                    <strong>{progress}%</strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="progress-details">
                    <span>
                      Model:{" "}
                      {selectedModel === "lora"
                        ? "LoRA"
                        : selectedModel === "sd35"
                        ? "SD 3.5"
                        : "DreamBooth"}
                    </span>

                    <span>Species: {selectedSpecies || "Not selected"}</span>

                    {!hasSpecies && (
                      <>
                        <span>Features: {selectedCount}</span>
                        <span>
                          Required: {completedRequired}/{REQUIRED_KEYS.length}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </aside>

            <section className="builder-main">
              <div className="builder-main-top">
                <div>
                  <span className="eyebrow">
                    {hasSpecies ? "Selected Species" : "Currently Editing"}
                  </span>

                  <h2>{hasSpecies ? selectedSpecies : selectedRegion}</h2>
                </div>

                <button
                  type="button"
                  disabled={!canProceed}
                  className={canProceed ? "btn-primary big" : "btn-disabled big"}
                  onClick={() =>
                    nav("/prompt", {
                      state: {
                        model: selectedModel,
                      },
                    })
                  }
                >
                  Proceed to Prompt
                </button>
              </div>

              {hasSpecies ? (
                <div className="species-ready-card">
                  <div className="species-ready-icon">🪶</div>
                  <h3>{selectedSpecies}</h3>
                  <p>
                    Predefined species profile is ready. You can proceed directly
                    to prompt review and generation.
                  </p>
                </div>
              ) : (
                <>
                  {!canProceed && (
                    <div className="required-box">
                      <div className="required-head">
                        <div>
                          <div className="required-title">
                            Required selections
                          </div>

                          <div className="required-sub">
                            Choose these core traits so the generated bird stays
                            natural and believable.
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

                  <FeaturesMenu
                    selectedRegion={selectedRegion}
                    selectedFeatures={selectedFeatures}
                    onSelectFeature={onSelectFeature}
                    onClearFeature={onClearFeature}
                  />
                </>
              )}

              <div className="live-prompt-box">
                <div className="live-prompt-head">
                  <strong>Live Prompt Preview</strong>
                  <span>{result.positive.length} characters</span>
                </div>

                <p>{result.positive}</p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}