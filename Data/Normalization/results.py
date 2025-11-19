import os
import cv2
import numpy as np
import matplotlib.pyplot as plt
from tqdm import tqdm
import random

# Paths
input_dir = r"E:\cub 2011\CUB_200_2011\images"
normalized_dir = r"E:\cub_2011_normalized_npy"

# Number of random images to sample
sample_size = 200

# Collect all image paths
original_paths = []
normalized_paths = []

for root, dirs, files in os.walk(input_dir):
    for file in files:
        if file.lower().endswith(('.png', '.jpg', '.jpeg')):
            original_paths.append(os.path.join(root, file))

for root, dirs, files in os.walk(normalized_dir):
    for file in files:
        if file.lower().endswith('.npy'):
            normalized_paths.append(os.path.join(root, file))

# Shuffle and pick random samples
random.shuffle(original_paths)
random.shuffle(normalized_paths)
original_paths = original_paths[:sample_size]
normalized_paths = normalized_paths[:sample_size]

# To store pixel values
original_pixels = []
normalized_pixels = []

# Collect original pixel values
print("Processing original images...")
for path in tqdm(original_paths, desc="Original images"):
    img = cv2.imread(path)
    if img is None:
        continue
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    original_pixels.extend(img.ravel())

# Collect normalized pixel values
print("Processing normalized images...")
for path in tqdm(normalized_paths, desc="Normalized images"):
    img = np.load(path)
    normalized_pixels.extend(img.ravel())

# Convert to numpy arrays
original_pixels = np.array(original_pixels)
normalized_pixels = np.array(normalized_pixels)

# Print stats
print("\n📊 ORIGINAL DATA STATS:")
print(f"Min: {original_pixels.min()}, Max: {original_pixels.max()}")
print(f"Mean: {original_pixels.mean():.2f}, Std: {original_pixels.std():.2f}")

print("\n📊 NORMALIZED DATA STATS:")
print(f"Min: {normalized_pixels.min()}, Max: {normalized_pixels.max()}")
print(f"Mean: {normalized_pixels.mean():.4f}, Std: {normalized_pixels.std():.4f}")

# Plot original histogram separately
plt.figure(figsize=(8,5))
plt.hist(original_pixels, bins=50, color='blue', alpha=0.7)
plt.title("Original Image Pixel Distribution (0–255)")
plt.xlabel("Pixel Intensity")
plt.ylabel("Frequency")
plt.tight_layout()
plt.savefig("original_pixel_distribution.png", dpi=300)
plt.show()

# Plot normalized histogram separately
plt.figure(figsize=(8,5))
plt.hist(normalized_pixels, bins=50, color='green', alpha=0.7)
plt.title("Normalized Image Pixel Distribution (0–1)")
plt.xlabel("Pixel Intensity")
plt.ylabel("Frequency")
plt.tight_layout()
plt.savefig("normalized_pixel_distribution.png", dpi=300)
plt.show()

print("\n✅ Histograms saved as 'original_pixel_distribution.png' and 'normalized_pixel_distribution.png'")
