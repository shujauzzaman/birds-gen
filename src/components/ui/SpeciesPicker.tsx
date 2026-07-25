import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

export default function SpeciesPicker({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q.trim()) return options;

    return options.filter((x) =>
      x.toLowerCase().includes(q.toLowerCase())
    );
  }, [options, q]);

  return (
    <div className="species-picker">
      <button
  type="button"
  className="species-trigger"
  onClick={() => setOpen(!open)}
>
  <span className="species-trigger-label">
    {value || "Select species"}
  </span>

  <ChevronDown
    size={18}
    className={`species-chevron ${open ? "rotate-180" : ""}`}
  />
</button>
      {open && (
        <div className="species-dropdown">
          <div className="species-search">
            <Search size={16} />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search species..."
            />
          </div>
<div className="species-divider" />
          <button
            type="button"
            className={!value ? "species-option active" : "species-option"}
            onClick={() => {
              onChange("");
              setOpen(false);
              setQ("");
            }}
          >
            Custom Bird
          </button>

          <div className="species-options">
            {filtered.map((item) => (
              <button
                key={item}
                type="button"
                className={
                  value === item ? "species-option active" : "species-option"
                }
                onClick={() => {
                  onChange(item);
                  setOpen(false);
                  setQ("");
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}