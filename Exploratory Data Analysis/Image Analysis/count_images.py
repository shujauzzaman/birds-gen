"""
Simple Image Counter for CUB-200-2011 Dataset
Counts total images inside the images folder
"""

import os

# ===============================
# CONFIGURATION
# ===============================

DATA_ROOT = r"C:\Users\PMLS\Desktop\FYP-BirdsGen\Dataset"
CUB_ROOT = os.path.join(DATA_ROOT, "CUB_200_2011")
IMAGES_DIR = os.path.join(CUB_ROOT, "images")

print("Configuration loaded successfully!")


# ===============================
# COUNT TOTAL IMAGES
# ===============================

def count_total_images(images_path):
    """
    Count all image files inside the images directory
    (searches inside all subfolders)
    """
    
    # Common image extensions
    image_extensions = (".jpg", ".jpeg", ".png", ".bmp", ".gif")
    
    total_images = 0

    # Walk through all subfolders
    for root, dirs, files in os.walk(images_path):
        for file in files:
            if file.lower().endswith(image_extensions):
                total_images += 1

    return total_images


# ===============================
# MAIN
# ===============================

if __name__ == "__main__":
    
    if not os.path.exists(IMAGES_DIR):
        print("Images directory not found!")
    else:
        total = count_total_images(IMAGES_DIR)
        print(f"\nTotal Images Found: {total:,}")
