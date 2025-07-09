# YouTube Clone – Full Stack App (Django + React)

A full-featured YouTube Clone built using Django (backend) and React (frontend). This project supports user authentication, video upload/playback, comments, likes, search, dashboard, and more.

---

## 📁 Project Structure

public/
│
├── backend/ # Django Backend
│ ├── backend/ # Django project directory
│ │ ├── init.py
│ │ ├── settings.py # Project settings
│ │ ├── urls.py # Main URL routing
│ │ ├── wsgi.py
│ │ └── asgi.py
│ │
│ ├── api/ # Django app for APIs
│ │ ├── migrations/ # DB migrations
│ │ ├── init.py
│ │ ├── admin.py # Admin site configs
│ │ ├── apps.py
│ │ ├── models.py # Models (User, Video)
│ │ ├── serializers.py # DRF Serializers
│ │ ├── views.py # API Views
│ │ ├── urls.py # API URL routing
│ │ └── tests.py # Tests (Optional)
│ │
│ ├── media/ # Uploaded media (videos, thumbnails)
│ ├── db.sqlite3 # Database (SQLite by default)
│ ├── manage.py # Django project manager
│
├── frontend/ # React Frontend
│ ├── public/ # Public files (index.html)
│ │ └── index.html
│ │
│ ├── src/ # React source code
│ │ ├── components/ # All React components
│ │ │ ├── Navbar.js # Navigation bar
│ │ │ ├── Sidebar.js # Sidebar menu
│ │ │ ├── Home.js # Display list of videos
│ │ │ ├── Upload.js # Upload video page
│ │ │ ├── Login.js # Login form
│ │ │ ├── Register.js # Register form
│ │ │ ├── VideoPlayer.js # Video watching page
│ │ │ └── Dashboard.js # User's uploaded videos
│ │ │
│ │ ├── App.js # Main app component with routing
│ │ ├── App.css # Global styles
│ │ ├── index.js # Entry point for React
│ │ └── axiosConfig.js # Axios instance setup (optional)
│ │
│ ├── package.json # Node dependencies for React
│ └── README.md # Frontend documentation (optional)
│
└── README.md # Main project documentation



---

## 🚀 Features

- User authentication (Sign In / Sign Up)
- Video upload (with category and thumbnail)
- Video playback
- Likes, comments, and watch count
- Search and category filtering
- Dashboard for user's uploaded videos
- Dark mode toggle
- Responsive design

---

## ⚙️ Tech Stack

- **Frontend:** React, Bootstrap, Axios
- **Backend:** Django, Django REST Framework