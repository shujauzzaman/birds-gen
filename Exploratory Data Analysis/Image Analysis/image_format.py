"""
Image Format Distribution with Visualization
"""

import os
from PIL import Image
from collections import Counter
import matplotlib.pyplot as plt

# ===============================
# CONFIGURATION
# ===============================

DATA_ROOT = r"C:\Users\PMLS\Desktop\FYP-BirdsGen\Dataset"
CUB_ROOT = os.path.join(DATA_ROOT, "CUB_200_2011")
IMAGES_DIR = os.path.join(CUB_ROOT, "images")

print("Configuration loaded successfully!")


# ===============================
# GET FORMAT DISTRIBUTION
# ===============================

def get_image_format_distribution(images_path):
    formats = []

    for root, dirs, files in os.walk(images_path):
        for file in files:
            full_path = os.path.join(root, file)

            try:
                with Image.open(full_path) as img:
                    formats.append(img.format)
            except:
                continue

    return Counter(formats)


# ===============================
# MAIN
# ===============================

if __name__ == "__main__":

    format_counts = get_image_format_distribution(IMAGES_DIR)

    print("\nImage Format Distribution:\n")
    for fmt, count in format_counts.items():
        print(f"{fmt}: {count}")

    # Plot
    formats = list(format_counts.keys())
    counts = list(format_counts.values())

    plt.figure(figsize=(6, 5))
    plt.bar(formats, counts)
    plt.xlabel("Image Format")
    plt.ylabel("Number of Images")
    plt.title("Image Format Distribution")
    plt.tight_layout()
    plt.show()
