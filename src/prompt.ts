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
  "full bird visible",
  "natural bird anatomy",
  "accurate beak shape",
  "accurate wing shape",
  "accurate tail shape",
  "detailed feather texture",
  "sharp focus",
  "natural soft lighting",
  "clean natural background",
  "professional bird photography",
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
];

export function buildPrompt(selected: SelectedFeatures, species = "") {
  const missing = REQUIRED_KEYS.filter((key) => !selected[key]);

  const hasSpecies = species.trim().length > 0;
  const speciesName = species.trim();
  const speciesProfile = hasSpecies ? getSpeciesProfile(speciesName) : "";

  const selectedParts = Object.values(selected)
    .map((item) => item.prompt || item.name)
    .filter(Boolean);

  const promptParts = [
    hasSpecies
      ? `realistic wildlife photograph of a ${speciesName}`
      : "realistic wildlife photograph of a bird",

    speciesProfile,

    ...selectedParts,

    ...QUALITY_PROMPT,
  ].filter(Boolean);

  return {
    positive: promptParts.join(", "),
    negative: NEGATIVE_PROMPT.join(", "),
    phrases: promptParts,
    missing,
    blockedReasons: [],
  };
}