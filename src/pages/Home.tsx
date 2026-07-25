import { useNavigate } from "react-router-dom";
import { ArrowRight, Brain, Feather, ShieldCheck, Sparkles } from "lucide-react";

import Navbar from "../components/Navbar";
import GalleryCard from "../components/ui/GalleryCard";
import { MOCK_GALLERY } from "../data/mockGallery";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="app-bg">
      <div className="app-shell">
        <Navbar />

        <main className="landing">
          <section className="hero-grid">
            <div className="hero-copy">
              <div className="product-badge">
                <Sparkles size={15} />
                Stable Diffusion 1.5 + BirdsGen LoRA
              </div>

              <h1>
                Generate realistic bird imagery from structured visual traits.
              </h1>

              <p>
                BirdsGen is a research-focused AI image generation interface for
                creating bird visuals using species profiles, anatomical features,
                and a deployed LoRA model.
              </p>

              <div className="hero-actions">
                <button className="primary-action" onClick={() => nav("/generate")}>
                  Open Generator
                  <ArrowRight size={18} />
                </button>

                <button
                  className="secondary-action"
                  onClick={() =>
                    document
                      .getElementById("featured-gallery")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  View Samples
                </button>
              </div>

              <div className="hero-stats">
                <div>
                  <strong>200+</strong>
                  <span>Species profiles</span>
                </div>

                <div>
                  <strong>SD 1.5</strong>
                  <span>Base model</span>
                </div>

                <div>
                  <strong>LoRA</strong>
                  <span>Fine-tuned bird model</span>
                </div>
              </div>
            </div>

            <div className="hero-showcase">
              <div className="showcase-card showcase-main">
                <img
                  src="/images/home_images/Orange-chinned Parakeet.webp"
                  alt="AI generated bird"
                />
              </div>

              <div className="showcase-card showcase-floating">
                <img
                  src="/images/home_images/eclectus.jpg"
                  alt="AI generated parrot"
                />
              </div>

              <div className="model-info-card">
                <span>Model Pipeline</span>
                <strong>Prompt → Modal API → LoRA → Image</strong>
              </div>
            </div>
          </section>

          <section className="value-section">
            <div className="value-card">
              <Brain size={22} />
              <h3>Prompt Intelligence</h3>
              <p>
                Feature selections are converted into realistic, anatomy-aware
                prompts for better generation consistency.
              </p>
            </div>

            <div className="value-card">
              <Feather size={22} />
              <h3>Bird-Specific Features</h3>
              <p>
                Choose body type, beak, wing, tail, plumage, feet and species
                details using a guided visual builder.
              </p>
            </div>

            <div className="value-card">
              <ShieldCheck size={22} />
              <h3>Stable Deployment</h3>
              <p>
                The inference backend is deployed on Modal, separate from the
                frontend for a cleaner production architecture.
              </p>
            </div>
          </section>

          <section id="featured-gallery" className="gallery-section">
            <div className="section-header">
              <div>
                <span>Generated Samples</span>
                <h2>Featured Bird Outputs</h2>
              </div>

              <button className="small-action" onClick={() => nav("/generate")}>
                Create New
              </button>
            </div>

            <div className="gallery-grid">
              {MOCK_GALLERY.map((it, idx) => (
                <GalleryCard key={`${it.title}-${idx}`} title={it.title} image={it.image} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}