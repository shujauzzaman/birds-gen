"""
Find Images Without Corresponding Text Descriptions
"""

import os

# ===============================
# CONFIGURATION
# ===============================

DATA_ROOT = r"C:\Users\PMLS\Desktop\FYP-BirdsGen\Dataset"
IMAGES_DIR = os.path.join(DATA_ROOT, "CUB_200_2011", "images")
TEXT_DIR = os.path.join(DATA_ROOT, "cvpr2016_cub", "text_c10")

# ===============================
# FUNCTION
# ===============================

def find_images_without_text(images_path, text_path):
    missing_text = []

    # Build set of all text files (without extension)
    text_files_set = set()
    for species_folder in os.listdir(text_path):
        species_path = os.path.join(text_path, species_folder)
        if not os.path.isdir(species_path):
            continue
        for txt_file in os.listdir(species_path):
            if txt_file.endswith(".txt"):
                text_files_set.add(txt_file.split(".")[0])  # remove extension

    # Walk through images
    for species_folder in os.listdir(images_path):
        class_path = os.path.join(images_path, species_folder)
        if not os.path.isdir(class_path):
            continue
        for img_file in os.listdir(class_path):
            if img_file.lower().endswith((".jpg", ".jpeg", ".png")):
                img_name = os.path.splitext(img_file)[0]
                if img_name not in text_files_set:
                    missing_text.append(os.path.join(class_path, img_file))

    return missing_text

# ===============================
# RUN
# ===============================

if __name__ == "__main__":
    if not os.path.exists(IMAGES_DIR) or not os.path.exists(TEXT_DIR):
        print("Images or Text folder not found!")
    else:
        missing = find_images_without_text(IMAGES_DIR, TEXT_DIR)
        print(f"\nTotal Images Missing Text Descriptions: {len(missing)}\n")
        for f in missing:
            print(f)
