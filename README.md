# GuardHer 🛡️

**GuardHer** is a smart safety platform for women offering instant SOS alerts, live GPS tracking, and safety heatmaps. Our goal is to ensure core protection through real-time interventions, while leveraging AI and ML to predict risks and detect distress, thereby enhancing urban and semi-urban safety.

---

## 👥 Project Team
This project was developed as our Final Year Project by the following group members:

| Name | Roll Number |
| :--- | :--- |
| **Satyam Jaiswal** | `2200271540102` |
| **Prateek Sharma** | `2200271540081` |
| **Shubham Kumar** | `2200271540108` |
| **Sarvesh Kumar** | `2200271540101` |

---

## ✨ Key Features
- **🚨 Instant SOS Alerts:** One tap sends your GPS location and an emergency alert to your trusted contacts via email/SMS in seconds.
- **🗺️ Live Safety Map:** Real-time danger zones and safe corridors powered by community-sourced data and AI analytics.
- **👥 Area Safety Reviews:** Community intelligence allowing users to rate and review the safety of specific areas.
- **🧠 AI Safety Predictions:** Predictive risk analysis flags unsafe areas before you arrive based on historical crime patterns and datasets.
- **🔒 Private & Encrypted:** Focus on user privacy with secure authentication and data protection.

---

## 🛠️ Technology Stack
- **Frontend:** React.js, Vite, Tailwind CSS, React Router, Google Maps API
- **Backend:** Python, Django, Django REST Framework, Django Channels (WebSockets)
- **Machine Learning:** Scikit-Learn, Pandas, Joblib
- **Database:** SQLite / PostgreSQL (Production)
- **Deployment:** Vercel (Frontend), Render (Backend + ML)

---

## 📂 Folder Structure

```text
GuardHer/
│
├── backend/                  # Django Backend & API
│   ├── api/                  # Core API routing and serializers
│   ├── contacts/             # Emergency contacts management apps
│   ├── emergency/            # SOS, Alerts, and Map tracking endpoints
│   ├── locations/            # Geospatial processing and heatmap data
│   ├── reviews/              # Community area reviews and WebSockets
│   ├── ml_model/             # Machine Learning Models & Datasets
│   │   ├── datasets/         # Raw CSV crime datasets
│   │   ├── final_crime_dataset.csv
│   │   ├── model.pkl         # Trained Scikit-Learn safety prediction model
│   │   └── predict_zone.py   # Prediction inference script
│   ├── manage.py             # Django entry point
│   └── requirements.txt      # Python dependencies
│
├── frontend/                 # React Frontend Application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable UI components (Navbar, SafetyMap, etc.)
│   │   ├── context/          # React Context (AuthContext, ThemeContext)
│   │   ├── pages/            # Application views (Dashboard, Home, Community, etc.)
│   │   ├── services/         # Axios API clients
│   │   ├── App.jsx           # Main React component & Routing
│   │   └── index.css         # Tailwind directives & Theme variables
│   ├── index.html            # Vite entry HTML
│   ├── package.json          # Node dependencies
│   └── tailwind.config.js    # Tailwind configuration
│
└── README.md                 # Project Documentation
```

---

## ⚙️ Environment Variables

Before running the project, you need to configure environment variables for both the frontend and backend.

### Backend (`backend/.env`)
Create a `.env` file in the `backend/` directory:
```env
SECRET_KEY='your-secret-key-here'
DEBUG=False
ALLOWED_HOSTS=your-backend-domain.onrender.com,localhost,127.0.0.1
DATABASE_URL=postgresql://user:password@hostname:5432/dbname
EMAIL_USER='host@gmail.com'
EMAIL_HOST_PASSWORD='your-app-password'
EMAIL_FROM='GuardHer <host@gmail.com>'
```

### Frontend (`frontend/.env`)
Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:8000/api
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```
*(Note: Use the production backend URL like `https://your-backend-domain.onrender.com/api` when deploying).*

---

## 🧠 How It Works (Project Functioning)

1. **User Interaction:** Users interact with the React-based frontend to view the safety heatmap, read/write community reviews, and trigger SOS alerts.
2. **Real-Time Data:** The frontend communicates with the Django backend via REST API for standard requests, and Django Channels (WebSockets) for real-time safety review feeds.
3. **Machine Learning Integration:** When requesting safety data, the backend passes location coordinates to the Scikit-Learn ML model (`model.pkl`). The model evaluates historical crime data to predict risk levels for the requested zone.
4. **Emergency Response:** If a user triggers an SOS, the backend immediately fetches their GPS coordinates and dispatches an automated email to their registered emergency contacts.
5. **Community Sourcing:** Users can submit real-time area reviews with GPS coordinates. These reviews are clustered to update the map's visual danger zones dynamically.

---

## 🚀 How to Run Locally

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt

# Create the .env file in the backend directory

python manage.py migrate
python manage.py runserver
```

### 2. Frontend Setup
```bash
cd frontend
npm install

# Create the .env file in the frontend directory

npm run dev
```

Your backend will be running on `http://localhost:8000` and the frontend will be accessible at `http://localhost:5173`.

---

*Built with ❤️ for women's safety everywhere.*
