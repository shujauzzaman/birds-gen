import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import { loadSelected, loadSpecies } from "../storage";
import { buildPrompt } from "../prompt";
import { generateBirdImage } from "../api";

import downloadIcon from "../assets/icons/download.svg";
import birdsHouse from "../assets/icons/birds_house.svg";

export default function PromptReview() {
  const selected = useMemo(() => loadSelected(), []);
  const species = useMemo(() => loadSpecies(), []);

  const hasSpecies = species.trim().length > 0;

  const res = useMemo(
    () => buildPrompt(selected, species),
    [selected, species]
  );

  const [positivePrompt, setPositivePrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");

  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    setPositivePrompt(res.positive);
    setNegativePrompt(res.negative);
  }, [res.positive, res.negative]);

  async function generate() {
    try {
      setErr("");
      setLoading(true);

      const data = await generateBirdImage(
        positivePrompt,
        negativePrompt
      );

      setImage(data.image);
    } catch {
      setErr(
        "Generation failed. Make sure backend and Automatic1111 are running."
      );
    } finally {
      setLoading(false);
    }
  }

  async function downloadImage() {
    if (!image) return;

    const response = await fetch(image);

    const blob = await response.blob();

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = `birdsgen-${Date.now()}.png`;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  }

  const canUse =
    positivePrompt.trim().length > 0 &&
    negativePrompt.trim().length > 0 &&
    (hasSpecies || res.missing.length === 0) &&
    !loading;

  return (
    <div className="min-h-screen bg-hero">
      <div className="min-h-screen site-overlay">
        <Navbar />

        <main className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 pt-6 md:pt-8 pb-10">
          <div className="preview-layout">
            {/* LEFT */}
            <section className="preview-left">
              <div className="preview-prompt-card">
                <div className="preview-card-label">
                  Prompt Preview
                </div>

                <textarea
                  value={positivePrompt}
                  onChange={(e) =>
                    setPositivePrompt(e.target.value)
                  }
                  placeholder="Describe the bird you want to bring to life..."
                  className="preview-prompt-textarea"
                />

                {/* hidden negative prompt */}
                <textarea
                  value={negativePrompt}
                  onChange={(e) =>
                    setNegativePrompt(e.target.value)
                  }
                  className="hidden"
                />
              </div>

              {/* species selected badge */}
              {hasSpecies && (
                <div className="mt-4 rounded-2xl border border-lime-400/30 bg-lime-400/10 px-4 py-3">
                  <div className="text-sm font-bold text-lime-200">
                    Using predefined species prompt
                  </div>

                  <div className="mt-1 text-sm text-white/70 break-words">
                    Species: {species}
                  </div>
                </div>
              )}

              {/* feature mode info */}
              {!hasSpecies && (
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="text-sm font-bold text-white">
                    Feature-based generation
                  </div>

                  <div className="mt-1 text-sm text-white/60">
                    Prompt generated from selected bird features.
                  </div>
                </div>
              )}

              <button
                type="button"
                disabled={!canUse}
                onClick={generate}
                className={
                  canUse
                    ? "preview-generate-button"
                    : "preview-generate-button preview-generate-disabled"
                }
              >
                {loading
                  ? "Generating..."
                  : "Generate"}
              </button>

              <div className="preview-actions">
                <Link
                  to="/generate"
                  className="preview-back-btn"
                >
                  Back
                </Link>
              </div>

              {!hasSpecies && res.missing.length > 0 && (
                <div className="preview-warning">
                  Missing:
                  {" "}
                  {res.missing.join(", ")}
                </div>
              )}

              {err && (
                <div className="preview-error">
                  {err}
                </div>
              )}
            </section>

            {/* RIGHT */}
            <section className="preview-right">
              <h1 className="preview-title">
                Generated Bird
              </h1>

              <div className="preview-result-card">
                {loading ? (
                  <div className="preview-empty">
                    <div className="preview-loader" />

                    <p>Generating your bird</p>

                    <span>
                      Please wait while BirdsGen creates it
                    </span>
                  </div>
                ) : image ? (
                  <div className="preview-image-wrap">
                    <img
                      src={image}
                      alt="Generated bird"
                      className="preview-result-image"
                    />

                    <button
                      type="button"
                      title="Download"
                      className="preview-download-icon-btn"
                      onClick={downloadImage}
                    >
                      <img
                        src={downloadIcon}
                        alt="download"
                        className="preview-download-icon"
                      />
                    </button>
                  </div>
                ) : (
                  <div className="preview-empty">
                    <img
                      src={birdsHouse}
                      alt="Bird house"
                      className="preview-empty-svg"
                    />

                    <p>Your bird will show up here</p>

                    <span>
                      Nothing to show yet
                    </span>
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}