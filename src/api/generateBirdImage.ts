export type ModelType = "lora" | "sd35" | "dreambooth";

export const MODEL_LABELS: Record<ModelType, string> = {
  lora: "LoRA",
  sd35: "SD 3.5",
  dreambooth: "DreamBooth",
};

const ENDPOINTS: Record<ModelType, string> = {
  lora: import.meta.env.VITE_MODAL_GENERATE_URL,
  sd35: "https://shujauzzaman20--cub-sd35-fastapi-app.modal.run/generate",
  dreambooth: "https://shujauzzaman20--cub-sd15-fastapi-app.modal.run",
};

function normalizeImage(data: any): string {
  const raw =
    data?.image ||
    data?.image_base64 ||
    data?.base64 ||
    data?.data ||
    data?.url ||
    "";

  if (!raw) {
    throw new Error("Image not found in API response");
  }

  if (typeof raw !== "string") {
    throw new Error("Invalid image format from API");
  }

  if (raw.startsWith("data:image")) {
    return raw;
  }

  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw;
  }

  return `data:image/png;base64,${raw}`;
}

export async function generateBirdImage(
  model: ModelType,
  positive: string,
  negative: string
): Promise<{ image: string }> {
  const endpoint = ENDPOINTS[model];

  const body =
    model === "lora"
      ? {
          positive,
          negative,
        }
      : {
          prompt: `${positive}, not: ${negative}`,
        };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `${MODEL_LABELS[model]} generation failed`);
  }

  const data = await res.json();

  return {
    image: normalizeImage(data),
  };
}