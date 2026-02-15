import os
import torch
import clip
from PIL import Image
import re

# -----------------------------
# Paths and Settings
# -----------------------------
TEXT_ROOT = r"C:\Users\arsla\OneDrive\Desktop\dataset\text_c10"
IMAGE_ROOT = r"C:\Users\arsla\OneDrive\Desktop\dataset\images"
MAX_TOKENS = 77     # CLIP token limit

# -----------------------------
# Load CLIP model
# -----------------------------
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# -----------------------------
# Utility Functions
# -----------------------------
def clean_caption(caption):
    """Remove non-ASCII characters and extra spaces."""
    caption = caption.encode("ascii", errors="ignore").decode()
    caption = re.sub(r"\s+", " ", caption).strip()
    return caption

def truncate_caption_for_clip(caption, max_tokens=MAX_TOKENS):
    """Truncate a caption to max_tokens (words) for CLIP."""
    words = caption.split()
    if len(words) > max_tokens:
        words = words[:max_tokens]
    return " ".join(words)

def best_caption_with_clip(image_path, captions):
    """
    Pick the best caption for an image using CLIP safely.
    """
    try:
        image = preprocess(Image.open(image_path)).unsqueeze(0).to(device)
    except Exception as e:
        print(f"⚠️ Failed to open image {image_path}: {e}")
        return None

    # Clean and truncate captions
    safe_captions = []
    for c in captions:
        c_clean = clean_caption(c.strip())
        if not c_clean:
            continue
        c_trunc = truncate_caption_for_clip(c_clean)
        safe_captions.append(c_trunc)

    if not safe_captions:
        return None

    try:
        text_tokens = clip.tokenize(safe_captions).to(device)
    except Exception as e:
        print(f"⚠️ Failed to tokenize captions for {image_path}: {e}")
        return None

    with torch.no_grad():
        image_features = model.encode_image(image)
        text_features = model.encode_text(text_tokens)

        # Normalize features
        image_features /= image_features.norm(dim=-1, keepdim=True)
        text_features /= text_features.norm(dim=-1, keepdim=True)

        # Cosine similarity
        similarity = (text_features @ image_features.T).squeeze(1)
        best_idx = similarity.argmax().item()
        return safe_captions[best_idx]

# -----------------------------
# Main Processing Loop
# -----------------------------
for bird_folder in sorted(os.listdir(TEXT_ROOT)):
    text_folder_path = os.path.join(TEXT_ROOT, bird_folder)
    image_folder_path = os.path.join(IMAGE_ROOT, bird_folder)

    if not os.path.isdir(text_folder_path) or not os.path.isdir(image_folder_path):
        continue

    print(f"\n📁 Processing folder: {bird_folder}")

    # Process all text files
    for fname in sorted(os.listdir(text_folder_path)):
        text_file_path = os.path.join(text_folder_path, fname)

        if not os.path.isfile(text_file_path) or fname.lower().endswith(".h5"):
            continue

        # Read captions
        try:
            with open(text_file_path, "r", encoding="utf-8", errors="ignore") as f:
                captions = f.readlines()
        except Exception as e:
            print(f"⚠️ Could not read {fname}: {e}")
            continue

        if len(captions) <= 1:
            continue  # already single caption

        # Find corresponding image
        base_name = os.path.splitext(fname)[0]
        img_path = None
        for ext in [".jpg", ".jpeg", ".png"]:
            candidate = os.path.join(image_folder_path, base_name + ext)
            if os.path.exists(candidate):
                img_path = candidate
                break

        if not img_path:
            print(f"⚠️ No image found for {fname}, skipping...")
            continue

        # Select best caption
        best = best_caption_with_clip(img_path, captions)
        if not best:
            continue

        # Overwrite text file
        try:
            with open(text_file_path, "w", encoding="utf-8") as f:
                f.write(best + "\n")
            print(f"✅ Updated {fname} -> {best[:80]}{'...' if len(best) > 80 else ''}")
        except Exception as e:
            print(f"⚠️ Failed to write {fname}: {e}")

print("\n🎯 SUCCESS — all text files now contain one CLIP-selected caption.")
