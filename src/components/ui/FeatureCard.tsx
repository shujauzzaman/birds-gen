function prettyLabel(raw: string) {
  return raw.replaceAll("_", " ").replaceAll("-", " ").trim();
}

export default function FeatureCard({
  name,
  image,
  selected,
  onClick,
}: {
  name: string;
  image: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={["feature-card", selected ? "feature-card-selected" : ""].join(" ")}
    >
      {/* image */}
      <div className="feature-imgWrap">
        <img src={image} alt={name} className="feature-img" />
      </div>

      {/* caption area (fixed height so alignment stays perfect) */}
      <div className="feature-caption">
        <div className="feature-titleText">{prettyLabel(name)}</div>
      </div>

      {/* selected badge is overlay (does NOT change card height) */}
      {selected && <div className="feature-badge">Selected</div>}
    </button>
  );
}
