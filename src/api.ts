export async function generateBirdImage(positive: string, negative: string) {
  const res = await fetch("http://localhost:5000/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ positive, negative }),
  });

  if (!res.ok) {
    throw new Error("Generation failed");
  }

  return res.json() as Promise<{ image: string }>;
}