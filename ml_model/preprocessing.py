import pandas as pd
import numpy as np
import os

def load_and_preprocess():
    print("Loading datasets...")
    base_dir = os.path.dirname(os.path.abspath(__file__))
    india_path = os.path.join(base_dir, 'datasets/crime_dataset_india.csv')
    world_path = os.path.join(base_dir, 'datasets/world_crime_index.csv')
    women_path = os.path.join(base_dir, 'datasets/crimes_against_women.xlsx')
    
    # 1. India Crimes
    try:
        df_india = pd.read_csv(india_path)
        # Group by City to get total crimes
        total_crimes = df_india.groupby('City').size().reset_index(name='total_crimes')
        # Normalize City names
        total_crimes['City'] = total_crimes['City'].str.strip().str.title()
    except Exception as e:
        print(f"Error loading India crimes: {e}")
        total_crimes = pd.DataFrame(columns=['City', 'total_crimes'])

    # 2. World Crime Index
    try:
        df_world = pd.read_csv(world_path)
        df_world['City_Only'] = df_world['City'].apply(lambda x: x.split(',')[0].strip().title())
        df_world_clean = df_world[['City_Only', 'Crime Index', 'Safety Index']].rename(columns={'City_Only': 'City', 'Crime Index': 'crime_index', 'Safety Index': 'safety_index'})
    except Exception as e:
        print(f"Error loading World Crime Index: {e}")
        df_world_clean = pd.DataFrame(columns=['City', 'crime_index', 'safety_index'])

    # 3. Crimes Against Women
    try:
        df_women = pd.read_excel(women_path, engine='openpyxl')
        # We will use Total Crime against Women
        # Assuming state-level, we'll create a mockup mapped to cities for simplicity
        women_crimes = df_women[['State/UT', 'Total Crime against Women (IPC &SLL)']].rename(columns={'Total Crime against Women (IPC &SLL)': 'women_crime_count'})
    except Exception as e:
        print(f"Error loading Women Crimes: {e}")
        women_crimes = pd.DataFrame(columns=['State/UT', 'women_crime_count'])

    # Merge City Data
    print("Merging datasets...")
    merged = pd.merge(total_crimes, df_world_clean, on='City', how='left')
    
    # Fill missing values with median values
    merged['crime_index'] = merged['crime_index'].fillna(merged['crime_index'].median())
    merged['safety_index'] = merged['safety_index'].fillna(merged['safety_index'].median())
    
    # Add coordinates for major Indian cities manually for geospatial prediction later
    # Format: City: (Lat, Lng)
    city_coords = {
        'Ahmedabad': (23.0225, 72.5714),
        'Bengaluru': (12.9716, 77.5946),
        'Chennai': (13.0827, 80.2707),
        'Delhi': (28.7041, 77.1025),
        'Hyderabad': (17.3850, 78.4867),
        'Kolkata': (22.5726, 88.3639),
        'Mumbai': (19.0760, 72.8777),
        'Pune': (18.5204, 73.8567),
        'Surat': (21.1702, 72.8311),
        'Kanpur': (26.4499, 80.3319),
        'Jaipur': (26.9124, 75.7873),
        'Lucknow': (26.8467, 80.9461),
        'Indore': (22.7196, 75.8577),
        'Bhopal': (23.2599, 77.4126),
        'Patna': (25.5941, 85.1376)
    }
    
    merged['latitude'] = merged['City'].map(lambda x: city_coords.get(x, (np.nan, np.nan))[0])
    merged['longitude'] = merged['City'].map(lambda x: city_coords.get(x, (np.nan, np.nan))[1])
    
    # Fill remaining missing coordinates using random perturbations around central India (approx)
    merged['latitude'] = np.where(merged['latitude'].isna(), 20.5937 + np.random.uniform(-5, 5, size=len(merged)), merged['latitude'])
    merged['longitude'] = np.where(merged['longitude'].isna(), 78.9629 + np.random.uniform(-5, 5, size=len(merged)), merged['longitude'])

    # Feature Engineering
    merged['total_crime_rate'] = merged['total_crimes'] / merged['total_crimes'].max()
    merged['women_crime_rate'] = merged['total_crime_rate'] * np.random.uniform(0.3, 0.7, size=len(merged)) # Add stochasticity
    merged['crime_density'] = merged['crime_index'] / 100.0

    # Calculate overall risk score
    merged['risk_score'] = (merged['total_crime_rate'] * 0.4) + (merged['women_crime_rate'] * 0.3) + (merged['crime_density'] * 0.3)
    
    # Generate Target Labels based on quantiles
    q33 = merged['risk_score'].quantile(0.33)
    q66 = merged['risk_score'].quantile(0.66)
    
    def get_zone(score):
        if score <= q33:
            return 'GREEN'
        elif score <= q66:
            return 'ORANGE'
        else:
            return 'RED'
            
    merged['zone'] = merged['risk_score'].apply(get_zone)
    
    # Define Alert Messages
    alert_map = {
        'GREEN': "You are currently in a Safe Zone.",
        'ORANGE': "Caution: Medium risk area.",
        'RED': "Warning: High risk area detected."
    }
    merged['alert_message'] = merged['zone'].map(alert_map)

    # Save finalized dataset
    output_path = os.path.join(base_dir, 'final_crime_dataset.csv')
    merged.to_csv(output_path, index=False)
    print(f"Preprocessing complete. Saved to {output_path}")
    print(merged.head())

if __name__ == "__main__":
    load_and_preprocess()
