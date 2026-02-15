"""
Class Distribution Analysis for CUB-200-2011
Shows how many images belong to each class
"""

import os
import matplotlib.pyplot as plt
from collections import Counter

# ===============================
# CONFIGURATION
# ===============================

DATA_ROOT = r"C:\Users\PMLS\Desktop\FYP-BirdsGen\Dataset"
CUB_ROOT = os.path.join(DATA_ROOT, "CUB_200_2011")
IMAGE_CLASS_LABELS_TXT = os.path.join(CUB_ROOT, "image_class_labels.txt")
CLASSES_TXT = os.path.join(CUB_ROOT, "classes.txt")

print("Configuration loaded successfully!")


# ===============================
# LOAD CLASS NAMES
# ===============================

def load_class_names(classes_file):
    """
    Load class ID -> class name mapping
    """
    class_dict = {}
    with open(classes_file, "r") as f:
        for line in f:
            class_id, class_name = line.strip().split(" ", 1)
            class_dict[int(class_id)] = class_name
    return class_dict


# ===============================
# COUNT IMAGES PER CLASS
# ===============================

def count_images_per_class(labels_file):
    """
    Count number of images for each class
    """
    class_counts = []

    with open(labels_file, "r") as f:
        for line in f:
            image_id, class_id = line.strip().split()
            class_counts.append(int(class_id))

    return Counter(class_counts)


# ===============================
# MAIN
# ===============================

if __name__ == "__main__":

    if not os.path.exists(IMAGE_CLASS_LABELS_TXT):
        print("Label file not found!")
        exit()

    # Load data
    class_names = load_class_names(CLASSES_TXT)
    class_counts = count_images_per_class(IMAGE_CLASS_LABELS_TXT)

    print(f"\nTotal Classes: {len(class_counts)}")

    # Sort classes by ID
    sorted_classes = sorted(class_counts.items())

    counts = [count for _, count in sorted_classes]

    print(f"Min images in a class: {min(counts)}")
    print(f"Max images in a class: {max(counts)}")

    # ===============================
    # PLOT
    # ===============================

    plt.figure(figsize=(12, 6))
    plt.bar(range(len(counts)), counts)
    plt.xlabel("Class Index")
    plt.ylabel("Number of Images")
    plt.title("Image Distribution per Class (CUB-200-2011)")
    plt.tight_layout()
    plt.show()
