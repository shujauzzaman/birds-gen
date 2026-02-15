export default function RegionMenu({
  selectedRegion,
  setSelectedRegion,
}: {
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
}) {
  const regions = ["Whole", "Beak", "Head", "Wings", "Breast", "Belly", "Back", "Feet", "Tail"];

  return (
    <div className="flex flex-col gap-2">
      {regions.map((r) => {
        const active = r === selectedRegion;

        return (
          <button
            key={r}
            type="button"
            onClick={() => setSelectedRegion(r)}
            className={[
              "group w-full text-left rounded-xl px-3 py-2 transition",
              "border bg-white/[0.04] hover:bg-white/[0.08] active:scale-[0.99]",
              active
                ? "border-lime-400/40 bg-lime-400/10 shadow-[0_0_0_1px_rgba(163,230,53,0.15)_inset]"
                : "border-white/10",
            ].join(" ")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* left indicator bar */}
                <span
                  className={[
                    "h-5 w-1 rounded-full transition",
                    active ? "bg-lime-300 shadow-[0_0_10px_rgba(163,230,53,0.55)]" : "bg-white/10",
                  ].join(" ")}
                />
                <span className={active ? "text-lime-100 font-semibold" : "text-white/75"}>
                  {r}
                </span>
              </div>

              <span
                className={[
                  "text-lg leading-none transition",
                  active ? "text-lime-300" : "text-white/25 group-hover:text-white/45",
                ].join(" ")}
              >
                ›
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
