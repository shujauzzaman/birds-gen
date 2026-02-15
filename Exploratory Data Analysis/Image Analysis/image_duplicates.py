"""
Duplicate Image Checker for CUB-200-2011
Based on perceptual hashing - detects visually similar images
"""

import os
import csv
from PIL import Image
import imagehash
from tqdm import tqdm
from collections import defaultdict

# ===============================
# CONFIGURATION
# ===============================

DATA_ROOT = r"C:\Users\PMLS\Desktop\FYP-BirdsGen\Dataset"
CUB_ROOT = os.path.join(DATA_ROOT, "CUB_200_2011")
IMAGES_DIR = os.path.join(CUB_ROOT, "images")

# Report output
DUPLICATES_REPORT = os.path.join(CUB_ROOT, "duplicates_report.csv")

# Perceptual hash settings (from your friend's script)
HASH_SIZE = 16
MAX_DISTANCE = 12  # Lower = stricter (try 5-8 for exact duplicates, 10-15 for near-duplicates)

print("Configuration loaded successfully!")


# ===============================
# HELPER FUNCTIONS
# ===============================

def get_all_image_paths(root_dir):
    """Walks through nested directories to collect all image file paths."""
    image_paths = []
    for root, _, files in os.walk(root_dir):
        for f in files:
            if f.lower().endswith(('.png', '.jpg', '.jpeg')):
                image_paths.append(os.path.join(root, f))
    return image_paths


# ===============================
# MAIN DUPLICATE DETECTION
# ===============================

def find_duplicates(images_dir, hash_size, max_distance):
    """
    Find duplicate/similar images using perceptual hashing
    Returns list of (duplicate_path, original_path, distance)
    """
    hash_map = defaultdict(list)
    all_files = get_all_image_paths(images_dir)

    if not all_files:
        print(f"Error: No images found in '{images_dir}'")
        return []

    initial_count = len(all_files)
    print(f"Found {initial_count} total images\n")
    
    # 1. Compute Hash for Each Image
    print("Computing perceptual hashes...")
    for fpath in tqdm(all_files, desc="Hashing images"):
        try:
            with Image.open(fpath) as im:
                h = imagehash.phash(im, hash_size=hash_size)
            hash_map[h].append(fpath)
        except Exception as e:
            print(f"Skipping (read error): {fpath} ({e})")

    # 2. Find Duplicates by Comparing Hashes
    print("\nFinding duplicates...")
    kept_hashes = set()
    duplicates = []
    unique_count = 0
    
    for h, file_list in tqdm(hash_map.items(), desc="Comparing hashes"):
        # Check if this hash is similar to any already-kept hash
        matching_hash = None
        min_distance = float('inf')
        
        for existing_hash in kept_hashes:
            distance = h - existing_hash
            if distance <= max_distance and distance < min_distance:
                matching_hash = existing_hash
                min_distance = distance
        
        if matching_hash is not None:
            # All images in this group are duplicates
            original = next(p for h2, paths in hash_map.items() 
                          if h2 == matching_hash for p in paths)
            for dup_path in file_list:
                duplicates.append((dup_path, original, min_distance))
        else:
            # This is a unique hash group - keep first image as original
            kept_hashes.add(h)
            original = file_list[0]
            unique_count += 1
            
            # Rest are exact duplicates within this hash group
            for dup_path in file_list[1:]:
                duplicates.append((dup_path, original, 0))

    return duplicates, unique_count, initial_count


# ===============================
# GENERATE REPORT
# ===============================

def save_report(duplicates, unique_count, total_count, output_file):
    """Save duplicate detection results to CSV"""
    
    # Write detailed duplicate list
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['Duplicate Image', 'Original Image', 'Hash Distance', 'Class'])
        
        for dup_path, orig_path, distance in sorted(duplicates, key=lambda x: x[2]):
            # Extract class name from path
            dup_class = os.path.basename(os.path.dirname(dup_path))
            writer.writerow([dup_path, orig_path, distance, dup_class])
    
    # Print summary
    print(f"\n{'='*60}")
    print(f"DUPLICATE DETECTION SUMMARY")
    print(f"{'='*60}")
    print(f"Total images scanned:     {total_count}")
    print(f"Unique images found:      {unique_count}")
    print(f"Duplicates detected:      {len(duplicates)}")
    print(f"Duplication rate:         {len(duplicates)/total_count*100:.2f}%")
    print(f"{'='*60}")
    
    # Breakdown by similarity
    exact = sum(1 for d in duplicates if d[2] == 0)
    near = sum(1 for d in duplicates if d[2] > 0)
    
    print(f"\nDuplicate Breakdown:")
    print(f"  - Exact duplicates (distance=0):  {exact}")
    print(f"  - Near duplicates (distance>0):   {near}")
    
    print(f"\nDetailed report saved to: {output_file}")


# ===============================
# RUN
# ===============================

if __name__ == "__main__":
    # Check dependencies
    try:
        import imagehash
        from tqdm import tqdm
    except ImportError:
        print("ERROR: Missing dependencies!")
        print("Install with: pip install imagehash tqdm")
        exit(1)
    
    if not os.path.exists(IMAGES_DIR):
        print(f"Images directory not found: {IMAGES_DIR}")
        exit(1)
    
    print(f"Scanning for duplicates (max distance: {MAX_DISTANCE})...\n")
    
    # Find duplicates
    duplicates, unique_count, total_count = find_duplicates(
        IMAGES_DIR, 
        HASH_SIZE, 
        MAX_DISTANCE
    )
    
    # Save report
    if duplicates:
        save_report(duplicates, unique_count, total_count, DUPLICATES_REPORT)
    else:
        print("\n✅ No duplicates found!")