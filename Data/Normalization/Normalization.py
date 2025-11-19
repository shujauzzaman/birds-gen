import os
import cv2
import numpy as np

input_dir = r"E:\cub 2011\CUB_200_2011\images"
output_dir = r"E:\cub_2011_normalized_npy"

for root, dirs, files in os.walk(input_dir):
    for file in files:
        if file.lower().endswith(('.png', '.jpg', '.jpeg')):
            img_path = os.path.join(root, file)
            img = cv2.imread(img_path)
            if img is None:
                continue
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  # correct color
            img = img.astype('float32') / 255.0          # normalize to [0,1]

            # Create same folder structure for .npy output
            save_path = os.path.join(output_dir, os.path.relpath(img_path, input_dir))
            save_path = os.path.splitext(save_path)[0] + ".npy"
            os.makedirs(os.path.dirname(save_path), exist_ok=True)

            np.save(save_path, img)
