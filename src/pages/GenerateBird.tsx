import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RegionMenu from "../components/RegionMenu";
import FeaturesMenu from "../components/FeaturesMenu";
import { buildPrompt, REQUIRED_KEYS } from "../prompt";
import { loadSelected, saveSelected, clearSelected } from "../storage";

type Selected = Record<
  string,
  { name: string; image: string; region: string; feature: string }
>;

export default function GenerateBird() {
  const nav = useNavigate();

  const [selectedRegion, setSelectedRegion] = useState("Whole");
  const [selectedFeatures, setSelectedFeatures] = useState<Selected>(() => loadSelected());

  const result = useMemo(() => buildPrompt(selectedFeatures), [selectedFeatures]);

  useEffect(() => {
    saveSelected(selectedFeatures);
  }, [selectedFeatures]);

  const canProceed = result.missing.length === 0 && result.blockedReasons.length === 0;

  const onSelectFeature = (
    key: string,
    value: { name: string; image: string; region: string; feature: string }
  ) => setSelectedFeatures((prev) => ({ ...prev, [key]: value }));

  const onClearFeature = (key: string) => {
    setSelectedFeatures((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  return (
    <div className="min-h-screen bg-hero">
      <div className="min-h-screen bg-black/55">
        <Navbar />

        <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-12 gap-4">
          {/* LEFT */}
          <aside className="col-span-12 md:col-span-3">
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div className="font-extrabold">Regions</div>
                <button
                  className="btn-ghost"
                  type="button"
                  onClick={() => {
                    clearSelected();
                    setSelectedFeatures({});
                  }}
                >
                  Reset
                </button>
              </div>

              <div className="mt-3">
                <RegionMenu selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
              </div>

              <div className="mt-4">
                <div className="text-sm font-bold">Quick Prompt</div>
                <div className="mt-2 rounded-xl bg-black/30 p-3 text-sm text-white/80">
                  {result.positive}
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT */}
          <main className="col-span-12 md:col-span-9 min-w-0">
            <div className="card p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-white/60 text-sm">Selected Region</div>
                  <div className="text-2xl font-extrabold">{selectedRegion}</div>
                </div>

                <button
                  type="button"
                  disabled={!canProceed}
                  className={canProceed ? "btn-primary" : "btn-ghost opacity-50 cursor-not-allowed"}
                  onClick={() => nav("/prompt")}
                >
                  Proceed to Prompt
                </button>
              </div>

              {result.blockedReasons.length > 0 && (
                <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
                  <div className="font-bold text-red-200">Blocked</div>
                  <div className="text-sm text-red-100/80 mt-1">
                    {result.blockedReasons.join(" • ")}
                  </div>
                </div>
              )}

              {/* ✅ REQUIRED CHECKLIST (use REQUIRED_KEYS not result.requiredKeys) */}
              {(result.missing.length > 0 || Object.keys(selectedFeatures).length > 0) && (
                <div className="mt-4 required-box">
                  <div className="required-head">
                    <div>
                      <div className="required-title">Required checklist</div>
                      <div className="required-sub">
                        Pick these to enable{" "}
                        <span className="text-lime-200 font-semibold">Proceed to Prompt</span>.
                      </div>
                    </div>

                    <div className="required-count">
                      {result.missing.length === 0 ? "All set ✅" : `${result.missing.length} missing`}
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
                            selected ? "required-chip-done" : "required-chip-missing",
                            isCurrentRegion ? "required-chip-focus" : "",
                          ].join(" ")}
                          title="Click to jump to this region"
                        >
                          <span className="required-chip-dot" />
                          <span className="required-chip-text">
                            <span className="required-chip-region">{region}</span>
                            <span className="required-chip-sep">→</span>
                            <span className="required-chip-feature">{feature}</span>
                          </span>

                          <span className="required-chip-state">{selected ? "" : ""}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* FEATURES */}
              <div className="mt-4">
                <FeaturesMenu
                  selectedRegion={selectedRegion}
                  selectedFeatures={selectedFeatures}
                  onSelectFeature={onSelectFeature}
                  onClearFeature={onClearFeature}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
