#!/usr/bin/env python3
"""
E1-US2: Detect and remove blurry images from nested folders using Variance of Laplacian.
Reads from: stage1_unique/
Writes sharp to: stage2_sharp/
Writes blurry to: blurry_removed/
"""

import os
import csv
import statistics
import cv2
import shutil
import numpy as np
from tqdm import tqdm

# --- AUTOMATIC CONFIGURATION ---
INPUT_DIR = "stage1_unique" 
OUTPUT_DIR = "stage2_sharp"
BLURRY_DIR = "blurry_removed"
LOG_FILE = "data_metrics.csv"
THRESHOLD = 100.0
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

def variance_of_laplacian_gray(image_path):
    """Calculates the sharpness score."""
    img = cv2.imdecode(np.fromfile(image_path, dtype=np.uint8), cv2.IMREAD_GRAYSCALE)
    if img is None:
        return None
    return cv2.Laplacian(img, cv2.CV_64F).var()

def filter_blurry(input_dir, output_dir, blurry_dir, log_file, threshold):
    os.makedirs(output_dir, exist_ok=True)
    os.makedirs(blurry_dir, exist_ok=True)

    all_files = get_all_image_paths(input_dir)
    if not all_files:
        print(f"Error: Input directory '{input_dir}' is empty. Run the previous script first.")
        return

    initial_scores = []
    kept_scores = []
    blurry_count = 0

    for fpath in tqdm(all_files, desc="Sharpness check"):
        try:
            var = variance_of_laplacian_gray(fpath)
            if var is None:
                shutil.move(fpath, os.path.join(blurry_dir, os.path.basename(fpath)))
                blurry_count += 1
                continue
            
            initial_scores.append(var)
        except Exception as e:
            print(f"Error processing {fpath}: {e}")
            shutil.move(fpath, os.path.join(blurry_dir, os.path.basename(fpath)))
            blurry_count += 1
            continue

        if var < threshold:
            shutil.move(fpath, os.path.join(blurry_dir, os.path.basename(fpath)))
            blurry_count += 1
        else:
            kept_scores.append(var)
            out_path = get_output_path(fpath, input_dir, output_dir)
            os.makedirs(os.path.dirname(out_path), exist_ok=True)
            shutil.copy2(fpath, out_path)
    
    # --- Log Metrics for Graph ---
    avg_initial_score = statistics.mean(initial_scores) if initial_scores else 0
    avg_kept_score = statistics.mean(kept_scores) if kept_scores else 0
    count_after_blur = len(get_all_image_paths(output_dir))
    
    metrics = [
        ['Image Count', 'After Blur Filter', count_after_blur],
        ['Image Quality (Laplacian)', 'Before Blur Filter', avg_initial_score],
        ['Image Quality (Laplacian)', 'After Blur Filter', avg_kept_score]
    ]
    
    with open(log_file, 'a', newline='') as f:
        writer = csv.writer(f)
        writer.writerows(metrics)
        
    print(f"\nBlur filtering complete. Saved sharp images to '{output_dir}'.")
    print(f"Moved {blurry_count} blurry images to '{blurry_dir}'.")
    print(f"Logged quality metrics and final count to '{log_file}'.")

if __name__ == "__main__":
    filter_blurry(INPUT_DIR, OUTPUT_DIR, BLURRY_DIR, LOG_FILE, THRESHOLD)