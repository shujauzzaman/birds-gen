import os
import shutil
import random
from collections import defaultdict

# ==============================
# CONFIGURATION (YOUR PATHS)
# ==============================
SOURCE_DIR = r"C:\Users\arsla\OneDrive\Desktop\dataset\final_clean_dataset"
TARGET_DIR = r"C:\Users\arsla\OneDrive\Desktop\dataset\balanced_final_dataset(min_samples)"
IMAGE_EXTENSIONS = (".jpg", ".jpeg", ".png")
SEED = 42

random.seed(SEED)

# ==============================
# STEP 1: COUNT IMAGES PER CLASS
# ==============================
class_images = defaultdict(list)

for class_name in os.listdir(SOURCE_DIR):
    class_path = os.path.join(SOURCE_DIR, class_name)

    if not os.path.isdir(class_path):
        continue

    for file in os.listdir(class_path):
        if file.lower().endswith(IMAGE_EXTENSIONS):
            class_images[class_name].append(file)

# ==============================
# STEP 2: FIND MINIMUM COUNT
# ==============================
class_counts = {cls: len(imgs) for cls, imgs in class_images.items()}
min_images = min(class_counts.values())

print("\n📊 Image count per class:")
for cls, count in sorted(class_counts.items()):
    print(f"{cls}: {count}")

print(f"\n🎯 Target images per class (balanced): {min_images}")

# ==============================
# STEP 3: CREATE TARGET DIR
# ==============================
os.makedirs(TARGET_DIR, exist_ok=True)

# ==============================
# STEP 4: SAMPLE & COPY IMAGES
# ==============================
for class_name, images in class_images.items():
    src_class_dir = os.path.join(SOURCE_DIR, class_name)
    tgt_class_dir = os.path.join(TARGET_DIR, class_name)

    os.makedirs(tgt_class_dir, exist_ok=True)

    selected_images = random.sample(images, min_images)

    for img in selected_images:
        src_img = os.path.join(src_class_dir, img)
        tgt_img = os.path.join(tgt_class_dir, img)
        shutil.copy2(src_img, tgt_img)

print("\n✅ DATASET BALANCING COMPLETED SUCCESSFULLY")
print(f"📂 Balanced dataset location:\n{TARGET_DIR}")
