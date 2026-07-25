const API_URL = import.meta.env.VITE_MODAL_GENERATE_URL;

export async function generateBirdImage(
  positive: string,
  negative: string
): Promise<{ image: string }> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      positive,
      negative,
      width: 768,
      height: 768,
      steps: 35,
      guidance: 8,
    }),
  });

  if (!response.ok) {
    throw new Error("Generation failed");
  }

  return await response.json();
}