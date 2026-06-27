const SD15_ENDPOINT =
  "https://shujauzzaman20--cub-sd15-fastapi-app.modal.run";

export async function generateBirdImage(
  positive: string,
  negative: string
): Promise<{ image: string }> {
  const res = await fetch(SD15_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: `${positive}, not: ${negative}`,
    }),
  });
  if (!res.ok) {
    throw new Error("SD15 generation failed");
  }
  return res.json();
}
