import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { loadSelected } from "../storage";
import { buildPrompt } from "../prompt";

export default function PromptReview() {
  const selected = useMemo(() => loadSelected(), []);
  const res = useMemo(() => buildPrompt(selected), [selected]);
  const [copied, setCopied] = useState<"" | "pos" | "neg">("");

  async function copy(text: string, which: "pos" | "neg") {
    await navigator.clipboard.writeText(text);
    setCopied(which);
    setTimeout(() => setCopied(""), 900);
  }

  const canUse = res.missing.length === 0 && res.blockedReasons.length === 0;

  return (
    <div className="min-h-screen bg-hero">
      <div className="min-h-screen bg-black/55">
        <Navbar />

        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="card p-6">
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-3xl font-extrabold">Prompt Review</h1>
              <Link className="btn-ghost" to="/generate">
                Back
              </Link>
            </div>

            {!canUse && (
              <div className="mt-4 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4">
                <div className="font-bold text-yellow-200">Not ready yet</div>
                {res.blockedReasons.length > 0 && (
                  <div className="mt-1 text-sm text-yellow-100/80">
                    {res.blockedReasons.join(" • ")}
                  </div>
                )}
                {res.missing.length > 0 && (
                  <div className="mt-1 text-sm text-yellow-100/80">
                    Missing: {res.missing.join(", ")}
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold">Positive</div>
                  <span className="chip">short & realistic</span>
                </div>
                <pre className="mt-3 whitespace-pre-wrap break-words rounded-xl bg-black/30 p-3 text-sm">
                  {res.positive}
                </pre>
                <button className="btn-primary w-full mt-3" onClick={() => copy(res.positive, "pos")}>
                  {copied === "pos" ? "Copied ✅" : "Copy Positive"}
                </button>
              </div>

              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold">Negative</div>
                  <span className="chip">blocks unrealistic</span>
                </div>
                <pre className="mt-3 whitespace-pre-wrap break-words rounded-xl bg-black/30 p-3 text-sm">
                  {res.negative}
                </pre>
                <button className="btn-primary w-full mt-3" onClick={() => copy(res.negative, "neg")}>
                  {copied === "neg" ? "Copied ✅" : "Copy Negative"}
                </button>
              </div>
            </div>

            <div className="mt-6 card p-4">
              <div className="font-bold mb-2">Selected phrases</div>
              <div className="flex flex-wrap gap-2">
                {res.phrases.map((p, i) => (
                  <span key={i} className="chip">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
