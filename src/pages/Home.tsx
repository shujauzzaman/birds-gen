import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import GalleryCard from "../components/ui/GalleryCard";
import { MOCK_GALLERY } from "../data/mockGallery";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-hero">
      <div className="min-h-screen site-overlay">
        <Navbar />

        <main className="mx-auto max-w-6xl px-4 py-12">
          <section className="home-hero-card">
            <div className="home-kicker">AI Bird Image Generator</div>

            <h1 className="home-title">
              Create realistic bird images
              <br />
              from simple visual features
            </h1>

            <p className="home-subtitle">
              Choose body shape, beak, wings, colors, tail and other bird
              features. BirdsGen builds a clean prompt and generates a
              realistic bird image.
            </p>

            <div className="home-actions">
              <button className="home-primary-btn" onClick={() => nav("/generate")}>
                Generate Your Bird
              </button>

              <button
                className="home-secondary-btn"
                onClick={() =>
                  document
                    .getElementById("featured-gallery")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View Gallery
              </button>
            </div>
          </section>

          <section id="featured-gallery" className="home-section">
            <div className="home-section-head">
              <div>
                <div className="home-kicker">Gallery</div>
                <h2 className="home-section-title">Featured AI Birds</h2>
              </div>

              <button className="home-small-btn" onClick={() => nav("/generate")}>
                Create New
              </button>
            </div>

            <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {MOCK_GALLERY.map((it, idx) => (
                <GalleryCard key={idx} title={it.title} image={it.image} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}