"""
Duplicate Text Files Analysis with Plot
"""

import os
import hashlib
import matplotlib.pyplot as plt

TEXT_DIR = r"C:\Users\PMLS\Desktop\FYP-BirdsGen\Dataset\cvpr2016_cub\text_c10"

def get_file_hash(file_path):
    with open(file_path, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()

def find_duplicates(text_root):
    hash_dict = {}
    duplicates = {}

    total_files = 0
    for species_folder in os.listdir(text_root):
        species_path = os.path.join(text_root, species_folder)
        if not os.path.isdir(species_path):
            continue
        for txt_file in os.listdir(species_path):
            if txt_file.endswith(".txt"):
                total_files += 1
                path = os.path.join(species_path, txt_file)
                file_hash = get_file_hash(path)
                if file_hash in hash_dict:
                    duplicates[path] = hash_dict[file_hash]
                else:
                    hash_dict[file_hash] = path
    return total_files, duplicates

if __name__ == "__main__":
    if not os.path.exists(TEXT_DIR):
        print("Text folder not found!")
    else:
        total_files, duplicates = find_duplicates(TEXT_DIR)
        print(f"Duplicate Text Files Found: {len(duplicates)}")

        # Plot
        plt.figure(figsize=(4,5))
        plt.bar(["Unique", "Duplicates"], [total_files - len(duplicates), len(duplicates)], color=['green','red'])
        plt.ylabel("Number of Files")
        plt.title("Duplicate Text Files")
        plt.tight_layout()
        plt.show()
