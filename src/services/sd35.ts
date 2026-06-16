const SD35_ENDPOINT =
  "https://shujauzzaman20--cub-sd35-fastapi-app.modal.run/generate";

export async function generateBirdImage(
  positive: string,
  negative: string
): Promise<{ image: string }> {
  const res = await fetch(SD35_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: `${positive}, not: ${negative}`,
    }),
  });

  if (!res.ok) {
    throw new Error("SD35 generation failed");
  }

  return res.json();
}