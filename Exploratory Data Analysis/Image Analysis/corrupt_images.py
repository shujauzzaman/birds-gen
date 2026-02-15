"""
Corrupted Image Checker with Visualization
"""

import os
from PIL import Image
import matplotlib.pyplot as plt

# ===============================
# CONFIGURATION
# ===============================

DATA_ROOT = r"C:\Users\PMLS\Desktop\FYP-BirdsGen\Dataset"
CUB_ROOT = os.path.join(DATA_ROOT, "CUB_200_2011")
IMAGES_DIR = os.path.join(CUB_ROOT, "images")

print("Configuration loaded successfully!")


# ===============================
# CHECK CORRUPTED IMAGES
# ===============================

def check_corrupted_images(images_path):
    corrupted = 0
    valid = 0

    for root, dirs, files in os.walk(images_path):
        for file in files:
            if file.lower().endswith((".jpg", ".jpeg", ".png")):
                full_path = os.path.join(root, file)

                try:
                    with Image.open(full_path) as img:
                        img.verify()
                    valid += 1
                except:
                    corrupted += 1

    return valid, corrupted


# ===============================
# MAIN
# ===============================

if __name__ == "__main__":

    valid_count, corrupted_count = check_corrupted_images(IMAGES_DIR)

    print(f"\nValid Images: {valid_count}")
    print(f"Corrupted Images: {corrupted_count}")

    # Plot
    plt.figure(figsize=(6, 5))
    plt.bar(["Valid", "Corrupted"], [valid_count, corrupted_count])
    plt.ylabel("Number of Images")
    plt.title("Corrupted Image Check")
    plt.tight_layout()
    plt.show()
