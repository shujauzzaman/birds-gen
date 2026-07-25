const SELECTED_KEY = "birdgen_selected_features";
const SPECIES_KEY = "birdgen_selected_species";
const MODEL_KEY = "birdgen_selected_model";

export type SelectedFeature = {
  name: string;
  prompt: string;
  region: string;
  feature: string;
};

export type SelectedFeatures = Record<string, SelectedFeature>;

export type StoredModelType = "lora" | "sd35" | "dreambooth";

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

export function loadModel(): StoredModelType {
  const value = localStorage.getItem(MODEL_KEY);

  if (value === "lora" || value === "sd35" || value === "dreambooth") {
    return value;
  }

  return "lora";
}

export function saveModel(model: StoredModelType) {
  localStorage.setItem(MODEL_KEY, model);
}