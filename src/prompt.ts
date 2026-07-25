import type { SelectedFeatures } from "./storage";
import { getSpeciesProfile } from "./data/speciesProfiles";

export const REQUIRED_KEYS = [
  "Whole|Shape",
  "Whole|Size",
  "Whole|Primary Color",
  "Beak|Bill Shape",
  "Wings|Wing Shape",
  "Tail|Tail Shape",
];

const QUALITY_PROMPT = [
  "realistic wildlife photograph",
  "single bird only",
  "full body bird visible",
  "natural bird anatomy",
  "biologically plausible bird",
  "accurate beak shape",
  "accurate wing structure",
  "accurate tail structure",
  "detailed feather texture",
  "sharp focus",
  "natural soft lighting",
  "clean natural background",
  "professional bird photography",
  "high detail",
  "8k wildlife photo",
];

const NEGATIVE_PROMPT = [
  "cartoon",
  "anime",
  "illustration",
  "painting",
  "drawing",
  "cgi",
  "3d render",
  "low quality",
  "blurry",
  "bad anatomy",
  "deformed bird",
  "mutated bird",
  "extra wings",
  "extra legs",
  "extra beak",
  "two heads",
  "wrong proportions",
  "human",
  "text",
  "watermark",
  "logo",
  "cropped",
  "out of frame",
  "multiple birds",
];

function getHabitatPrompt(selected: SelectedFeatures, species: string) {
  const text = [
    species,
    ...Object.values(selected).map((x) => x.prompt),
  ]
    .join(" ")
    .toLowerCase();

  if (
    text.includes("duck") ||
    text.includes("waterbird") ||
    text.includes("grebe") ||
    text.includes("loon") ||
    text.includes("pelican") ||
    text.includes("cormorant")
  ) {
    return "near calm water, wetland habitat, natural reeds in background";
  }

  if (
    text.includes("gull") ||
    text.includes("seabird") ||
    text.includes("albatross") ||
    text.includes("tern") ||
    text.includes("auklet")
  ) {
    return "coastal natural environment, ocean background, realistic seabird habitat";
  }

  if (
    text.includes("hawk") ||
    text.includes("raptor") ||
    text.includes("owl")
  ) {
    return "natural forest edge background, alert wild bird posture";
  }

  if (
    text.includes("hummingbird")
  ) {
    return "flowering natural background, hovering or delicate perching posture";
  }

  if (
    text.includes("long-legged") ||
    text.includes("wading")
  ) {
    return "shallow wetland habitat, natural marsh background";
  }

  return "natural tree branch perch, soft forest background";
}

function cleanPrompt(parts: string[]) {
  return parts
    .filter(Boolean)
    .map((p) => p.trim())
    .filter((p, i, arr) => arr.indexOf(p) === i)
    .join(", ");
}

export function buildPrompt(selected: SelectedFeatures, species = "") {
  const missing = REQUIRED_KEYS.filter((key) => !selected[key]);

  const hasSpecies = species.trim().length > 0;
  const speciesName = species.trim();
  const speciesProfile = hasSpecies ? getSpeciesProfile(speciesName) : "";

  const selectedParts = Object.values(selected)
    .map((item) => item.prompt || item.name)
    .filter(Boolean);

  const habitat = getHabitatPrompt(selected, speciesName);

  const promptParts = [
    hasSpecies
      ? `realistic wildlife photograph of a ${speciesName}`
      : "realistic wildlife photograph of a unique bird",
    speciesProfile,
    ...selectedParts,
    habitat,
    ...QUALITY_PROMPT,
  ];

  return {
    positive: cleanPrompt(promptParts),
    negative: NEGATIVE_PROMPT.join(", "),
    phrases: promptParts,
    missing,
    blockedReasons: [],
  };
}