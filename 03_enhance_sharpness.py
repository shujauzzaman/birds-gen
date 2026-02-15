#!/usr/bin/env python3
"""
E1-US3: Apply image-sharpening techniques (Unsharp Mask) to valid images.
Reads from: stage2_sharp/
Writes enhanced to: stage3_enhanced/
"""

import os
import shutil
from PIL import Image, ImageFilter
from tqdm import tqdm

# --- AUTOMATIC CONFIGURATION ---
INPUT_DIR = "stage2_sharp" 
OUTPUT_DIR = "stage3_enhanced"
RADIUS = 2.0
PERCENT = 150
THRESHOLD = 3
# -------------------------------

def get_all_image_paths(root_dir):
    """Walks through nested directories to collect all image file paths."""
    image_paths = []
    for root, _, files in os.walk(root_dir):
        for f in files:
            if f.lower().endswith(('.png', '.jpg', '.jpeg')):
                image_paths.append(os.path.join(root, f))
    return image_paths

def get_output_path(original_path, input_dir, output_dir):
    """Calculates the output path, preserving the nested class folder structure."""
    rel_path = os.path.relpath(original_path, input_dir)
    return os.path.join(output_dir, rel_path)

def apply_unsharp_mask(image_path, output_path, radius, percent, threshold):
    """Loads an image, applies Unsharp Mask, and saves it, preserving structure."""
    try:
        with Image.open(image_path) as img:
            sharp_img = img.filter(ImageFilter.UnsharpMask(
                radius=radius,
                percent=percent, 
                threshold=threshold
            ))
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            sharp_img.save(output_path)
            return True
    except Exception as e:
        print(f"Error enhancing {image_path}: {e}. Copying original.")
        # Fallback: copy original file if enhancement fails
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        shutil.copy2(image_path, output_path) 
        return False

def enhance_images_in_directory(input_dir, output_dir, radius, percent, threshold):
    os.makedirs(output_dir, exist_ok=True)
    all_files = get_all_image_paths(input_dir)
    
    if not all_files:
        print(f"Error: Input directory '{input_dir}' is empty. Run the previous script first.")
        return

    for fpath in tqdm(all_files, desc="Enhancing images"):
        out_path = get_output_path(fpath, input_dir, output_dir)
        apply_unsharp_mask(fpath, out_path, radius, percent, threshold)
        
    print(f"\nImage enhancement complete. Saved to '{output_dir}'.")

if __name__ == "__main__":
    enhance_images_in_directory(INPUT_DIR, OUTPUT_DIR, RADIUS, PERCENT, THRESHOLD)