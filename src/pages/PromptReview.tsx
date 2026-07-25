import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Download, Sparkles, Wand2 } from "lucide-react";

import Navbar from "../components/Navbar";

import { loadSelected, loadSpecies, loadModel } from "../storage";
import { buildPrompt } from "../prompt";
import {
  generateBirdImage,
  MODEL_LABELS,
  type ModelType,
} from "../api/generateBirdImage";

import birdsHouse from "../assets/icons/birds_house.svg";

export default function PromptReview() {
  const location = useLocation();

  const selectedModel: ModelType = location.state?.model || loadModel();

  const selected = useMemo(() => loadSelected(), []);
  const species = useMemo(() => loadSpecies(), []);

  const hasSpecies = species.trim().length > 0;

  const res = useMemo(() => buildPrompt(selected, species), [selected, species]);

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
        selectedModel,
        positivePrompt,
        negativePrompt
      );

      setImage(data.image);
    } catch (e: any) {
      console.error("Generation error:", e);
      setErr(e?.message || "Generation failed. Please try again.");
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
    a.download = `birdsgen-${selectedModel}-${Date.now()}.png`;

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
      <div className="min-h-screen page-overlay">
        <Navbar />

        <main className="preview-page">
          <div className="preview-header">
            <div>
              <div className="home-kicker">Prompt Review</div>

              <h1>Generate your final bird image</h1>

              <p>
                Review the prompt, adjust details if needed, then generate using
                the selected BirdsGen model.
              </p>
            </div>

            <div className="model-pill">
              <Sparkles size={17} />
              <span>{MODEL_LABELS[selectedModel]} Inference</span>
            </div>
          </div>

          <div className="preview-layout">
            <section className="preview-left">
              <div className="preview-prompt-card">
                <div className="preview-card-label">
                  <Wand2 size={14} />
                  Positive Prompt
                </div>

                <textarea
                  value={positivePrompt}
                  onChange={(e) => setPositivePrompt(e.target.value)}
                  placeholder="Describe the bird you want to generate..."
                  className="preview-prompt-textarea"
                />

                <textarea
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  className="hidden"
                />
              </div>

              {hasSpecies && (
                <div className="species-badge">
                  <strong>Using predefined species prompt</strong>
                  <span>Species: {species}</span>
                </div>
              )}

              {!hasSpecies && (
                <div className="species-badge neutral">
                  <strong>Feature-based generation</strong>
                  <span>Prompt generated from selected visual features.</span>
                </div>
              )}

              <div className="species-badge neutral">
                <strong>Selected Model</strong>
                <span>{MODEL_LABELS[selectedModel]}</span>
              </div>

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
                  ? "Generating realistic bird..."
                  : `Generate Bird with ${MODEL_LABELS[selectedModel]}`}
              </button>

              <div className="preview-actions">
                <Link to="/generate" className="preview-back-btn">
                  Back
                </Link>
              </div>

              {!hasSpecies && res.missing.length > 0 && (
                <div className="preview-warning">
                  Missing: {res.missing.join(", ")}
                </div>
              )}

              {err && <div className="preview-error">{err}</div>}
            </section>

            <section className="preview-right">
              <h2 className="preview-title">Generated Bird</h2>

              <div className="preview-result-card">
                {loading ? (
                  <div className="preview-empty">
                    <div className="preview-loader" />

                    <p>Generating your bird</p>

                    <span>
                      First generation can take 20–40 seconds while the model
                      wakes up.
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
                      <Download size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="preview-empty">
                    <img
                      src={birdsHouse}
                      alt="Bird house"
                      className="preview-empty-svg"
                    />

                    <p>Your bird will appear here</p>

                    <span>Ready when you are</span>
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