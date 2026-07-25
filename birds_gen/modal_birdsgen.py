import base64
from io import BytesIO
from pathlib import Path

import modal

app = modal.App("birdsgen-sd15-lora")

CACHE_DIR = Path("/cache")
cache_volume = modal.Volume.from_name("birdsgen-hf-cache", create_if_missing=True)

image = (
    modal.Image.debian_slim(python_version="3.10")
    .apt_install("git")
    .pip_install(
        "torch==2.4.1",
        "diffusers==0.30.3",
        "transformers==4.44.2",
        "accelerate==0.34.2",
        "peft==0.12.0",
        "safetensors",
        "pillow",
        "fastapi[standard]",
        "huggingface_hub",
    )
    .env({"HF_HOME": "/cache"})
)

MODEL_ID = "runwayml/stable-diffusion-v1-5"
LORA_REPO = "AWAI5/birdsgen-lora"
LORA_FILE = "bird_lora_200_species_6k.safetensors"


@app.cls(
    image=image,
    gpu="A10G",
    timeout=300,
    scaledown_window=120,
    volumes={"/cache": cache_volume},
    secrets=[modal.Secret.from_name("huggingface-secret")],
)
class BirdGenerator:
    @modal.enter()
    def load_model(self):
        import torch
        from diffusers import StableDiffusionPipeline

        self.pipe = StableDiffusionPipeline.from_pretrained(
            MODEL_ID,
            torch_dtype=torch.float16,
            cache_dir="/cache",
        ).to("cuda")

        self.pipe.load_lora_weights(
            LORA_REPO,
            weight_name=LORA_FILE,
        )

        self.pipe.fuse_lora(lora_scale=0.8)
        self.pipe.enable_attention_slicing()

    @modal.method()
    def generate(self, positive: str, negative: str = ""):
        img = self.pipe(
            prompt=positive,
            negative_prompt=negative,
            width=512,
            height=512,
            num_inference_steps=28,
            guidance_scale=7.5,
        ).images[0]

        buffer = BytesIO()
        img.save(buffer, format="PNG")
        b64 = base64.b64encode(buffer.getvalue()).decode("utf-8")

        return {"image": f"data:image/png;base64,{b64}"}


@app.function(image=image, timeout=300)
@modal.fastapi_endpoint(method="POST")
def generate(payload: dict):
    positive = payload.get("positive", "")
    negative = payload.get("negative", "")

    if not positive.strip():
        return {"error": "Positive prompt is required"}

    generator = BirdGenerator()
    return generator.generate.remote(positive, negative)