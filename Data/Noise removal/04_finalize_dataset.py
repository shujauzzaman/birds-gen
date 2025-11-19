#!/usr/bin/env python3
"""
E1-US4: Move cleaned and enhanced images to the final output folder.
Reads from: stage3_enhanced/
Writes final data to: final_clean_dataset/
"""

import os
import shutil
from tqdm import tqdm

# --- AUTOMATIC CONFIGURATION ---
INPUT_DIR = "stage3_enhanced" 
FINAL_OUT = "final_clean_dataset"
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

def finalize_dataset(input_dir, final_out):
    os.makedirs(final_out, exist_ok=True)
    
    all_files = get_all_image_paths(input_dir)

    if not all_files:
        print(f"Error: Input directory '{input_dir}' is empty. Run the previous script first.")
        return

    for src_path in tqdm(all_files, desc="Finalizing dataset"):
        dest_path = get_output_path(src_path, input_dir, final_out)
        
        try:
            os.makedirs(os.path.dirname(dest_path), exist_ok=True)
            shutil.copy2(src_path, dest_path)
        except Exception as e:
            print(f"Error copying {src_path} to final destination: {e}")

    print(f"\nCollection complete. Final clean dataset is ready in: '{final_out}'.")

if __name__ == "__main__":
    finalize_dataset(INPUT_DIR, FINAL_OUT)