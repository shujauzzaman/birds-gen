#!/usr/bin/env python3
"""
E1-US1: Identify and remove duplicate images from nested folders using pHash.
FIX: Increased MAX_DISTANCE to find more near-duplicates for demonstration purposes.
"""

import os
import shutil
import random
import time
import csv
from PIL import Image
import imagehash
from tqdm import tqdm
from collections import defaultdict

# --- AUTOMATIC CONFIGURATION ---
INPUT_DIR = "images" 
OUTPUT_DIR = "stage1_unique"
DUPLICATES_DIR = "duplicates_removed"
LOG_FILE = "data_metrics.csv"
HASH_SIZE = 16
MAX_DISTANCE = 12  # <--- INCREASED THIS VALUE TO CATCH MORE NEAR-DUPLICATES
# -------------------------------

# ... (Rest of the code remains the same as the last revision) ...

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

def find_and_move_duplicates(input_dir, output_dir, duplicates_dir, log_file, hash_size, max_distance):
    os.makedirs(output_dir, exist_ok=True)
    os.makedirs(duplicates_dir, exist_ok=True)

    hash_map = defaultdict(list)
    all_files = get_all_image_paths(input_dir)

    if not all_files:
        print(f"Error: Input directory '{input_dir}' is empty or not found. Check if the 'images' folder exists.")
        return

    initial_count = len(all_files)
    
    # 1. Compute Hash for Each Image
    for fpath in tqdm(all_files, desc="Hashing images"):
        try:
            with Image.open(fpath) as im:
                h = imagehash.phash(im, hash_size=hash_size)
            hash_map[h].append(fpath)
        except Exception as e:
            print(f"Skipping (read error): {fpath} ({e})")

    kept_hashes = set()
    unique_count = 0
    duplicates_count = 0
    
    # 2. Compare Hashes and Move Duplicates
    for h, file_list in hash_map.items():
        is_duplicate_of_kept = False
        for existing_hash in kept_hashes:
            if h - existing_hash <= max_distance:
                is_duplicate_of_kept = True
                break
        
        if is_duplicate_of_kept:
            for dup in file_list:
                dup_name = f"{os.path.splitext(os.path.basename(dup))[0]}_{int(time.time()*100)}_{random.randint(0,99)}{os.path.splitext(os.path.basename(dup))[1]}"
                shutil.move(dup, os.path.join(duplicates_dir, dup_name))
                duplicates_count += 1
        else:
            kept_hashes.add(h)
            keeper = file_list[0]
            out_keeper = get_output_path(keeper, input_dir, output_dir)
            
            os.makedirs(os.path.dirname(out_keeper), exist_ok=True)
            shutil.copy2(keeper, out_keeper)
            unique_count += 1
            
            for dup in file_list[1:]:
                dup_name = f"{os.path.splitext(os.path.basename(dup))[0]}_{int(time.time()*100)}_{random.randint(0,99)}{os.path.splitext(os.path.basename(dup))[1]}"
                shutil.move(dup, os.path.join(duplicates_dir, dup_name))
                duplicates_count += 1

    # 3. Log Metrics for Graph
    metrics = [
        ['Metric', 'Stage', 'Value'],
        ['Image Count', 'Initial (Raw Data)', initial_count],
        ['Image Count', 'After Deduplication', unique_count]
    ]

    with open(log_file, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerows(metrics)
    
    print(f"\nProcessing complete. Unique images saved to '{output_dir}'.")
    print(f"Moved {duplicates_count} duplicates to '{duplicates_dir}'.")
    print(f"Logged image count metrics to '{log_file}'.")

if __name__ == "__main__":
    find_and_move_duplicates(INPUT_DIR, OUTPUT_DIR, DUPLICATES_DIR, LOG_FILE, HASH_SIZE, MAX_DISTANCE)