const SELECTED_KEY = "birdgen_selected_features";
const SPECIES_KEY = "birdgen_selected_species";

export type SelectedFeature = {
  name: string;
  prompt: string;
  region: string;
  feature: string;
};

export type SelectedFeatures = Record<string, SelectedFeature>;

export function loadSelected(): SelectedFeatures {
  try {
    return JSON.parse(localStorage.getItem(SELECTED_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveSelected(value: SelectedFeatures) {
  localStorage.setItem(SELECTED_KEY, JSON.stringify(value));
}

export function clearSelected() {
  localStorage.removeItem(SELECTED_KEY);
  localStorage.removeItem(SPECIES_KEY);
}

export function loadSpecies() {
  return localStorage.getItem(SPECIES_KEY) || "";
}

export function saveSpecies(species: string) {
  localStorage.setItem(SPECIES_KEY, species);
}