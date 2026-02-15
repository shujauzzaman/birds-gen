"""
Captions per File Analysis with Histogram
"""

import os
import matplotlib.pyplot as plt

TEXT_DIR = r"C:\Users\PMLS\Desktop\FYP-BirdsGen\Dataset\cvpr2016_cub\text_c10"

def captions_per_file(text_root):
    captions_count = {}

    for species_folder in os.listdir(text_root):
        species_path = os.path.join(text_root, species_folder)
        if not os.path.isdir(species_path):
            continue
        for txt_file in os.listdir(species_path):
            if txt_file.endswith(".txt"):
                path = os.path.join(species_path, txt_file)
                with open(path, "r", encoding="utf-8") as f:
                    lines = [line.strip() for line in f if line.strip()]
                    captions_count[path] = len(lines)
    return captions_count

if __name__ == "__main__":
    if not os.path.exists(TEXT_DIR):
        print("Text folder not found!")
    else:
        captions_count = captions_per_file(TEXT_DIR)
        counts = list(captions_count.values())
        print(f"Min Captions per File: {min(counts)}")
        print(f"Max Captions per File: {max(counts)}")
        print(f"Average Captions per File: {sum(counts)/len(counts):.2f}")

        # Plot histogram
        plt.figure(figsize=(8,5))
        plt.hist(counts, bins=range(min(counts), max(counts)+2), color='skyblue', edgecolor='black')
        plt.xlabel("Number of Captions per File")
        plt.ylabel("Number of Files")
        plt.title("Caption Count Distribution per File")
        plt.tight_layout()
        plt.show()
