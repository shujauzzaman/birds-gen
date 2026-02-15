const KEY = "birdsgen:selected";

export function loadSelected() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveSelected(v: any) {
  try {
    localStorage.setItem(KEY, JSON.stringify(v));
  } catch {}
}

export function clearSelected() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
