import pandas as pd
import sys

def explore():
    india = pd.read_csv('ml_model/datasets/crime_dataset_india.csv')
    world = pd.read_csv('ml_model/datasets/world_crime_index.csv')
    
    with open('columns.txt', 'w') as f:
        f.write("India Crime Columns:\n")
        f.write('\n'.join(india.columns.tolist()) + "\n\n")
        
        f.write("World Crime Columns:\n")
        f.write('\n'.join(world.columns.tolist()) + "\n\n")
        
        try:
            women = pd.read_excel('ml_model/datasets/crimes_against_women.xlsx', engine='openpyxl')
            f.write("Women Crime Columns:\n")
            f.write('\n'.join(women.columns.tolist()) + "\n")
        except Exception as e:
            f.write("Error reading women crime: " + str(e) + "\n")

if __name__ == "__main__":
    explore()
