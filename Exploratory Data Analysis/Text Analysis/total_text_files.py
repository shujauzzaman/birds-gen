"""
Total Text Files Analysis with Plot
"""

import os
import matplotlib.pyplot as plt

TEXT_DIR = r"C:\Users\PMLS\Desktop\FYP-BirdsGen\Dataset\cvpr2016_cub\text_c10"

def count_text_files(text_root):
    total_files = 0
    for species_folder in os.listdir(text_root):
        species_path = os.path.join(text_root, species_folder)
        if not os.path.isdir(species_path):
            continue
        for txt_file in os.listdir(species_path):
            if txt_file.endswith(".txt"):
                total_files += 1
    return total_files

if __name__ == "__main__":
    if not os.path.exists(TEXT_DIR):
        print("Text folder not found!")
    else:
        total = count_text_files(TEXT_DIR)
        print(f"Total Text Files: {total}")

        # Plot
        plt.figure(figsize=(4,5))
        plt.bar(["Text Files"], [total], color='steelblue')
        plt.ylabel("Number of Files")
        plt.title("Total Text Files in text_c10")
        plt.tight_layout()
        plt.show()
