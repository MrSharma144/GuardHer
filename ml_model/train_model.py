import pandas as pd
import numpy as np
import os
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

def train():
    print("Loading preprocessed dataset...")
    base_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(base_dir, 'final_crime_dataset.csv')
    
    if not os.path.exists(data_path):
        print("Dataset not found. Please run preprocessing.py first.")
        return
        
    df = pd.read_csv(data_path)
    
    # Define features and target
    # We will train the model to predict the zone based on coordinates and some base features
    # Since in real-time we only have coordinates, we will train a separate spatial model 
    # to estimate the risk based purely on lat/lang.
    
    X = df[['latitude', 'longitude']]
    y = df['zone']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training Random Forest Classifier model on spatial data...")
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X_train, y_train)
    
    y_pred = clf.predict(X_test)
    print("Accuracy:", accuracy_score(y_test, y_pred))
    print("Classification Report:\n", classification_report(y_test, y_pred))
    
    # Save the model
    model_path = os.path.join(base_dir, 'model.pkl')
    joblib.dump(clf, model_path)
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    train()
