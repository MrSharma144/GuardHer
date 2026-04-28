import os
import joblib
import warnings
import pandas as pd

warnings.filterwarnings('ignore')

def get_alert_message(zone):
    messages = {
        'GREEN': "You are currently in a Safe Zone.",
        'ORANGE': "Caution: Medium risk area.",
        'RED': "Warning: High risk area detected."
    }
    return messages.get(zone, "Unknown Zone")

def get_zone_score(zone):
    scores = {
        'GREEN': 0.15,
        'ORANGE': 0.65,
        'RED': 0.95
    }
    return scores.get(zone, 0.5)

def predict_safety_zone(latitude, longitude):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(base_dir, 'model.pkl')
    
    # Fallback to random if no model found
    if not os.path.exists(model_path):
        print("Model not found. Falling back to default prediction.")
        return {
            "zone": "ORANGE",
            "crime_score": 0.50,
            "alert_message": get_alert_message("ORANGE")
        }
        
    try:
        clf = joblib.load(model_path)
        # Create a df with feature names to avoid sklearn warnings if that was how it was trained
        X = pd.DataFrame([[latitude, longitude]], columns=['latitude', 'longitude'])
        prediction = clf.predict(X)[0]
        
        # Calculate a pseudo score using probabilities
        probabilities = clf.predict_proba(X)[0]
        max_prob = max(probabilities)
        
        # Base score on class
        score = get_zone_score(prediction)
        
        return {
            "zone": str(prediction),
            "crime_score": round(float(score), 2),
            "alert_message": get_alert_message(prediction)
        }
    except Exception as e:
        print(f"Prediction Error: {e}")
        return {
            "zone": "ORANGE",
            "crime_score": 0.50,
            "alert_message": get_alert_message("ORANGE")
        }

if __name__ == "__main__":
    # Test
    res = predict_safety_zone(28.6139, 77.2090) # Delhi coordinates
    print("Delhi Prediction:", res)
