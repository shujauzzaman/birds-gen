export type SelectedMap = Record<
  string,
  { name: string; image: string; region: string; feature: string }
>;

export const REQUIRED_KEYS = [
  "Whole|Shape",
  "Whole|Size",
  "Whole|Primary Color",
  "Beak|Bill Shape",
  "Beak|Bill Color",
] as const;

export type RequiredKey = (typeof REQUIRED_KEYS)[number];

const ORDER = [
  "Whole|Shape",
  "Whole|Size",
  "Whole|Primary Color",
  "Whole|Upperparts Color",
  "Whole|Underparts Color",
  "Beak|Bill Shape",
  "Beak|Bill Length",
  "Beak|Bill Color",
  "Head|Head Pattern",
  "Head|Eye Color",
  "Wings|Wing Shape",
  "Wings|Wing Pattern",
  "Wings|Wing Color",
  "Tail|Tail Shape",
  "Tail|Tail Pattern",
] as const;

function cleanToken(v: string) {
  return v.replaceAll("_", " ").replaceAll("-", " ").replace(/\s+/g, " ").trim();
}

function toNaturalPhrase(region: string, feature: string, raw: string) {
  const v = cleanToken(raw);
  const r = region.toLowerCase();
  const f = feature.toLowerCase();

  if (r === "whole" && f.includes("primary color")) return `${v} feathers`;
  if (r === "whole" && f === "size") return `${v} size`;
  if (r === "whole" && f === "shape") return `${v} body shape`;

  if (r === "beak" && f.includes("bill shape")) return `${v} beak`;
  if (r === "beak" && f.includes("bill color")) return `${v} beak color`;
  if (r === "beak" && f.includes("bill length")) return `${v} beak length`;

  if (r === "head" && f.includes("eye color")) return `${v} eyes`;
  if (r === "head" && f.includes("head pattern")) return `${v} head pattern`;

  return `${v} ${feature.toLowerCase()}`;
}

export type PromptResult = {
  positive: string;
  negative: string;
  missing: RequiredKey[];
  blockedReasons: string[];
  phrases: string[];
  requiredKeys: RequiredKey[]; // ✅ added
};

export function buildPrompt(selected: SelectedMap): PromptResult {
  const missing: RequiredKey[] = REQUIRED_KEYS.filter((k) => !selected[k]);

  const blockedReasons: string[] = [];
  const shape = selected["Whole|Shape"]?.name ?? "";
  const size = selected["Whole|Size"]?.name ?? "";
  if (shape.includes("hummingbird") && size.includes("very_large")) {
    blockedReasons.push("Hummingbird-like shape cannot be Very Large in allowed set.");
  }

  const keys = Object.keys(selected);
  const sorted = [
    ...ORDER.filter((k) => keys.includes(k)),
    ...keys.filter((k) => !ORDER.includes(k as any)),
  ];

  // ✅ keep prompt short: max 10 phrases
  const phrases = sorted
    .map((k) => {
      const s = selected[k];
      return toNaturalPhrase(s.region, s.feature, s.name);
    })
    .slice(0, 10);

  // ✅ Realistic but SHORT
  const positive =
    phrases.length === 0
      ? "A realistic bird photo."
      : `A realistic bird photo with ${phrases.join(", ")}. Natural colors, natural anatomy.`;

  const negative =
    "cartoon, anime, illustration, cgi, 3d render, toy, plastic, blurry, low quality, deformed, extra wings, extra legs, wrong anatomy, unrealistic colors, text, watermark, logo";

  return {
    positive,
    negative,
    missing,
    blockedReasons,
    phrases,
    requiredKeys: [...REQUIRED_KEYS], // ✅ added
  };
}
