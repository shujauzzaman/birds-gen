import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import GalleryCard from "../components/ui/GalleryCard";
import { MOCK_GALLERY } from "../data/mockGallery";

export default function Home() {
  const nav = useNavigate();
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return MOCK_GALLERY;
    return MOCK_GALLERY.filter((x) => x.title.toLowerCase().includes(s));
  }, [q]);

  return (
    <div className="min-h-screen bg-hero">
      {/* dark overlay */}
      <div className="min-h-screen bg-black/55">
        <Navbar />

        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight">
            Featured AI-Generated Images
          </h1>

         <div className="mt-6 mx-auto max-w-xl">
  <div className="search">
    <span className="search-icon" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="search-svg"
      >
        <path
          d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M16.5 16.5 21 21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>

    <input
      className="search-input"
      placeholder="Search birds, e.g. parrot..."
      value={q}
      onChange={(e) => setQ(e.target.value)}
    />

    {q.trim() && (
      <button className="search-clear" type="button" onClick={() => setQ("")}>
        Clear
      </button>
    )}
  </div>
</div>


          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((it, idx) => (
              <GalleryCard key={idx} title={it.title} image={it.image} />
            ))}
          </div>

          <div className="mt-12 border-t border-white/10 pt-10">
            <h2 className="text-center text-3xl sm:text-4xl font-extrabold">
              Genrate Your Own
            </h2>

            <div className="mt-6 flex justify-center">
              <button className="btn-primary px-12 py-3" onClick={() => nav("/generate")}>
                Generate
              </button>
            </div>
          </div>

          <div className="mt-16 pb-10 flex justify-center">
  <div className="text-center max-w-3xl">
    <div className="text-4xl sm:text-5xl font-extrabold leading-tight">
      Explore the beauty of avian life
      <br />
      through stunning photography
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
}
