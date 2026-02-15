from rembg import remove
from PIL import Image, ImageFilter
import os
import numpy as np

# ---- Helper functions ----

def resize_pad(image_path, size=512):
    img = Image.open(image_path).convert("RGBA")
    img.thumbnail((size, size), Image.LANCZOS)

    new_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    new_img.paste(
        img,
        ((size - img.width) // 2, (size - img.height) // 2)
    )
    return new_img


def smooth_alpha(img, radius=1):
    alpha = img.split()[-1]
    alpha = alpha.filter(ImageFilter.GaussianBlur(radius=radius))
    img.putalpha(alpha)
    return img


def center_bird_only(img, size=512, tolerance=12, strength=1.15):
    alpha = np.array(img.split()[-1])
    if alpha.max() == 0:
        return img

    ys, xs = np.nonzero(alpha)
    cx = xs.mean()
    cy = ys.mean()

    dx = (size / 2) - cx
    dy = (size / 2) - cy

    if abs(dx) < tolerance and abs(dy) < tolerance:
        return img

    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    canvas.paste(img, (int(dx * strength), int(dy * strength)), img)
    return canvas


# ---- Folders ----

input_root = r"C:/Users/arsla/OneDrive/Desktop/datasetclean/final_clean_dataset"
output_root = r"C:/Users/arsla/OneDrive/Desktop/datasetclean/bg.removed"

os.makedirs(output_root, exist_ok=True)


# ---- Main processing ----

for index, class_folder in enumerate(os.listdir(input_root)):

    # 🔹 Start from the 157th folder
    if index < 156:
        continue

    class_input_path = os.path.join(input_root, class_folder)

    if not os.path.isdir(class_input_path):
        continue

    class_output_path = os.path.join(output_root, class_folder) 
    os.makedirs(class_output_path, exist_ok=True)

    print(f"\nProcessing class folder ({index + 1}): {class_folder}")

    for file in os.listdir(class_input_path):
        if not file.lower().endswith(('.png', '.jpg', '.jpeg')):
            continue

        input_path = os.path.join(class_input_path, file)

        try:
            img = resize_pad(input_path)
        except Exception as e:
            print(f"  Skipped {file} (cannot open image): {e}")
            continue

        try:
            result = remove(img)
            result = center_bird_only(result)
            result = smooth_alpha(result)

            output_path = os.path.join(
                class_output_path,
                os.path.splitext(file)[0] + ".png"
            )
            result.save(output_path)

            print(f"  Saved processed image: {output_path}")

        except Exception as e:
            print(f"  Skipped {file} (processing error): {e}")
            continue

print("\nAll images processed ✅")
