# MonBondhu Frontend

🌐 **MonBondhu** (মনবন্ধু) is a culturally-aware web application designed to help rural Bangladeshi communities access mental health support, find nearby healthcare facilities, track maternal & child health, and get preventive health guidance. This is the **frontend** of the project.

---

HLD Link: https://app.eraser.io/workspace/xMSnq5e2wjQ7D6V9iR78

The project architecture includes a React frontend and supportive backend for offline and privacy-focused functionality. Mission 1 and Mission 2 are fully implemented, enabling mood tracking in Bangla with local storage and an interactive health facility map with offline fallback. Mission 3 and Mission 4 have completed frontends: Mission 3 allows anonymous help requests, while Mission 4 shows seasonal health tips with a language toggle and offline access. Backend integration for Missions 3 and 4 is pending, with the system emphasizing privacy, rural accessibility, and culturally relevant guidance.

---

## 🛠 Tech Stack

### Frontend
- **React.js** – UI library  
- **Tailwind CSS** – Styling  
- **React Leaflet** – Interactive maps for healthcare facilities  
- **Axios** – API requests to backend  
- **React Router** – Client-side routing  
- **LocalStorage** – Offline caching for user data  

### Backend
- **Node.js** – JavaScript runtime  
- **Express.js** – Web framework for API development  
- **MongoDB** – NoSQL database for storing users, facilities, and mood logs  
- **Mongoose** – ODM for MongoDB  
- **Firebase Authentication** – User authentication (email/password & Google sign-in)  
- **Axios / node-fetch** – External API requests (e.g., Overpass API for real-world facilities)  
- **dotenv** – Environment variable management  
- **CORS** – Enable cross-origin requests from frontend  

-   

---
## Backend git repo
Here is the Backend [Backend](https://github.com/MaskuraBegum/monbondu-Backend)
## 📌 Features & Implementation Plan

### 1. Mental Health Check-In
**Goal:** Track daily emotional wellness.  
**Plan:**  
- Users log mood & stress in Bangla.  
- Offline storage ensures data is qeueed without internet.  
- Trend graphs visualize emotional patterns.  
- Privacy-first: logs remain on device.  

---

### 2. Community Health Map
**Goal:** Locate nearby healthcare facilities.  
**Plan:**  
- Interactive map with markers for Clinics, Upazila Health Complexes, NGO centers, Pharmacies, CHWs.  
- Geolocation-based proximity ranking.  
- Offline fallback with cached list.  
- Popups show name, type, distance, and landmark.  

---

### 3. Anonymous Help Request
**Goal:** Enable privacy-first help requests.  
**Plan:**  
- Users submit requests without personal identifiers.  
- Requests queued offline, sent automatically when online.  
- Users receive confirmation and next-step instructions.  
- Culturally sensitive consent and messaging.

---

### 4. Seasonal Preventive Health Tips
**Goal:** Provide context-aware health guidance.  
**Plan:**  
- Display tips for seasonal risks: dengue (monsoon), flu/pneumonia (winter), diarrhea (summer), heat/cold safety.  
- Advice adapted for rural Bangladesh context.  
- Offline access: preloaded content available without network.  
- Push notifications to nudge users during high-risk seasons.

---

### 5. Maternal & Child Health Tracker
**Goal:** Track ANC visits and child vaccinations.  
**Plan:**  
- Users input expected delivery or child birth date.  
- Automatic reminders for ANC checkups and vaccination schedule (BCG, Penta, MR, etc.).  
- Offline-capable; reminders work even without connectivity.  
- Simple UI with culturally sensitive language.

---

### 6. Health Events & Community Health Worker Directory
**Goal:** Help users access local health services and personnel.  
**Plan:**  
- Display upcoming health camps, vaccination drives, mental health awareness sessions.  
- RSVP functionality integrated with calendar.  
- Searchable CHW directory: name, village/union, skills, contact availability.  
- Verified badges for trained volunteers; no popularity ratings.  
- Offline list fallback for areas with poor network.

---

### 7. Voice-First Assistant
**Goal:** Enable low-literacy users to navigate the app using voice.  
**Plan:**  
- Bangla speech recognition for commands like "স্বাস্থ্য তথ্য দেখাও" (Show health info) or "হাসপাতাল কোথায়?" (Where is hospital?).  
- Text-to-Speech (TTS) reads health tips aloud offline.  
- Pre-cache important tips for offline use.  
- Culturally sensitive prompts for elderly or visually impaired users.  

---

### 8. Data Analytics & Export (Optional Frontend Visualization)
**Goal:** Provide anonymized engagement metrics for NGOs/district health offices.  
**Plan:**  
- Aggregate weekly/daily mood check-ins.  
- Count anonymous help requests per upazila.  
- Most-viewed preventive health tips.  
- Visual charts in dashboard; no personal data exported.  

---

## 📄 API Specification

The API endpoints used in the frontend are documented in (/openai.yaml) file of this folder following the OpenAPI standard.

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18  
- npm or yarn  
- MonBondhu backend server running  

### Installation
```bash
# Clone the repo
git clone https://github.com/your-username/monbondhu-frontend.git


# Enter the folder
cd monbondhu-frontend

# Install dependencies
npm install
# or
yarn install
