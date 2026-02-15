import pandas as pd
import matplotlib.pyplot as plt
import os
import numpy as np

# --- AUTOMATIC CONFIGURATION ---
LOG_FILE = "data_metrics.csv"
OUTPUT_DIR = "pipeline_reports"
# -------------------------------

def create_combined_graph(log_file, output_dir):
    if not os.path.exists(log_file):
        print(f"Error: Log file '{log_file}' not found. Run scripts 01-02 first.")
        return

    os.makedirs(output_dir, exist_ok=True)

    # 1. Load and Reshape Data
    df = pd.read_csv(log_file, header=None, names=['Metric', 'Stage', 'Value'])
    df_pivot = df.pivot(index='Stage', columns='Metric', values='Value')
    
    # Define the required stage order for the plot's X-axis
    required_stages = ['Initial (Raw Data)', 'After Deduplication', 'After Blur Filter']
    
    # Create the final dataframe with correctly ordered stages
    data_points = {
        'Image Count': [
            df_pivot.loc['Initial (Raw Data)', 'Image Count'],
            df_pivot.loc['After Deduplication', 'Image Count'],
            df_pivot.loc['After Blur Filter', 'Image Count'],
        ],
        'Average Sharpness Score': [
            df_pivot.loc['Before Blur Filter', 'Image Quality (Laplacian)'],
            df_pivot.loc['Before Blur Filter', 'Image Quality (Laplacian)'],
            df_pivot.loc['After Blur Filter', 'Image Quality (Laplacian)'],
        ]
    }

    df_combined = pd.DataFrame(data_points, index=required_stages)
    
    # 2. Plotting Setup (Grouped Bar Chart)
    fig, ax1 = plt.subplots(figsize=(12, 7))

    # --- Plot 1: Image Count (Left Axis) ---
    width = 0.35
    stages = df_combined.index
    x = np.arange(len(stages))
    
    rects1 = ax1.bar(x - width/2, df_combined['Image Count'], width, 
                     label='Image Count (Left Axis)', color='#377EB8')
    ax1.set_ylabel('Image Count (Total Images)', color='#377EB8', fontweight='bold')
    ax1.tick_params(axis='y', labelcolor='#377EB8')
    ax1.grid(axis='y', linestyle='--', alpha=0.6)
    
    # Add data labels
    for rect in rects1:
        height = rect.get_height()
        ax1.annotate(f'{int(height)}',
                    xy=(rect.get_x() + rect.get_width() / 2, height),
                    xytext=(0, 3), textcoords="offset points",
                    ha='center', va='bottom', fontweight='bold', fontsize=9)
    
    # --- Plot 2: Sharpness Score (Right Axis) ---
    ax2 = ax1.twinx()
    rects2 = ax2.bar(x + width/2, df_combined['Average Sharpness Score'], width, 
                     label='Avg. Sharpness Score (Right Axis)', color='#E41A1C')
    ax2.set_ylabel('Average Sharpness Score (Laplacian Variance)', color='#E41A1C', fontweight='bold')
    ax2.tick_params(axis='y', labelcolor='#E41A1C')

    # Add data labels
    for rect in rects2:
        height = rect.get_height()
        ax2.annotate(f'{height:.2f}',
                    xy=(rect.get_x() + rect.get_width() / 2, height),
                    xytext=(0, 3), textcoords="offset points",
                    ha='center', va='bottom', fontweight='bold', fontsize=9)
    
    # --- Final Touches ---
    ax1.set_xticks(x)
    ax1.set_xticklabels(stages, rotation=15, ha="right")
    ax1.set_title('Impact of Data Cleaning Pipeline: Count Reduction & Quality Improvement')
    
    lines, labels = ax1.get_legend_handles_labels()
    lines2, labels2 = ax2.get_legend_handles_labels()
    ax1.legend(lines + lines2, labels + labels2, loc='upper left')
    
    fig.tight_layout()
    
    combined_path = os.path.join(output_dir, '01_combined_pipeline_impact.png')
    plt.savefig(combined_path)
    plt.close()
    print(f"\nSUCCESS: Saved Combined Pipeline Impact graph to {combined_path}")


if __name__ == "__main__":
    create_combined_graph(LOG_FILE, OUTPUT_DIR)