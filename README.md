## Running the code (Frontend)

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.




## For backend 
# SmartVieew AI Backend

Backend services for **SmartVieew AI – Autonomous Urban Intelligence Platform**.

This backend powers the AI detection pipeline, video processing, incident generation, and APIs used by the SmartVieew dashboard.

---

# Features

- AI-powered weapon detection using YOLO
- Live CCTV/RTSP stream processing
- Video upload support
- Incident generation
- REST APIs
- CORS enabled
- Ready for integration with Risk Assessment Agent

---

# Tech Stack

- Python 3.11+
- Flask
- Flask-CORS
- Ultralytics YOLO
- OpenCV
- NumPy
- yt-dlp

---

# Project Structure

```
backend/

├── weapon-detection-server.py
├── weapon-detection-server-fixed.py
├── requirements.txt
├── verify-detection-setup.py
├── verify-model-classes.py
├── test-model-classes.py
├── test-all-feeds.py
├── test-parallel-detection.py
└── test-screenshot-capture.py
```

---

# Prerequisites

- Python 3.11 or later
- pip
- Git

(Optional)

- CUDA-enabled GPU
- NVIDIA Drivers
- CUDA Toolkit

The backend also works on CPU.

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/<your-username>/SmartVieew-AI.git

cd SmartVieew-AI
```

---

## 2. Create Virtual Environment

### Linux/macOS

```bash
python3 -m venv venv
```

### Windows

```bash
python -m venv venv
```

---

## 3. Activate Virtual Environment

### Linux/macOS

```bash
source venv/bin/activate
```

### Windows

```cmd
venv\Scripts\activate
```

---

## 4. Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Running the Backend

Start the Flask server:

```bash
python weapon-detection-server.py
```

or

```bash
python weapon-detection-server-fixed.py
```

The server will start on the configured host and port (typically `http://localhost:5000` unless changed in the code).

---

# Verify Installation

Run:

```bash
python verify-detection-setup.py
```

This checks:

- Python version
- OpenCV installation
- YOLO installation
- Model availability
- Required dependencies

---

# Testing

Model verification

```bash
python verify-model-classes.py
```

Test model

```bash
python test-model-classes.py
```

Test live feeds

```bash
python test-all-feeds.py
```

Parallel detection

```bash
python test-parallel-detection.py
```

Screenshot capture

```bash
python test-screenshot-capture.py
```

---

# Requirements

Main dependencies:

```
Flask
Flask-CORS
Ultralytics YOLO
OpenCV
NumPy
yt-dlp
```

Install manually if needed:

```bash
pip install flask flask-cors ultralytics opencv-python-headless numpy yt-dlp
```

---

# API Overview

The backend is responsible for:

- Receiving video streams
- Running YOLO inference
- Detecting weapons
- Returning detection results
- Sending incidents to the frontend

Typical workflow:

```
Camera Feed
      │
      ▼
Frame Extraction
      │
      ▼
YOLO Detection
      │
      ▼
Detection Results
      │
      ▼
Incident Generation
      │
      ▼
Frontend Dashboard
```

---

# Future Enhancements

Upcoming SmartVieew AI backend features:

- Risk Assessment Agent (LLM)
- Incident Management Service
- AI-generated Reports
- Notification Service
- Traffic Intelligence
- Civic Infrastructure Monitoring
- Fire Detection
- Edge AI Deployment

---

# Troubleshooting

## OpenCV Error

Reinstall OpenCV:

```bash
pip install --upgrade opencv-python-headless
```

---

## YOLO Model Not Found

Download the required model:

```bash
yolo predict model=yolov8n.pt source=test.jpg
```

or place your trained model in the configured models directory.

---

## ModuleNotFoundError

Install all dependencies again:

```bash
pip install -r requirements.txt
```

---

## Virtual Environment Issues

Deactivate:

```bash
deactivate
```

Remove:

```bash
rm -rf venv
```

Create again:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```






# 🚀 SmartVieew AI

> **Autonomous Urban Intelligence Platform**
>
> *From Detection to Decision: Building the Intelligence Layer for Future Cities.*

---

## 🌍 Overview

SmartVieew AI is an AI-powered Urban Intelligence Platform designed to transform passive surveillance infrastructure into an intelligent decision-making ecosystem.

The platform leverages **Computer Vision**, **Agentic AI**, and **Real-Time Analytics** to detect incidents, assess risks, recommend response actions, and assist authorities in managing public safety, traffic, civic infrastructure, and emergency operations.

Rather than functioning as a traditional CCTV monitoring system, SmartVieew AI acts as an **AI-powered operational intelligence layer** capable of supporting campuses, residential communities, industrial parks, and future smart cities.

---

# 🎯 Vision

To become the operating system powering safer, smarter, and more efficient cities through AI-driven decision support.

---

# 🚨 Problem Statement

Modern cities generate enormous amounts of surveillance and infrastructure data, but decision-making remains largely manual.

Current challenges include:

* Manual CCTV monitoring
* Delayed incident detection
* Slow emergency response
* Fragmented city operations
* Lack of centralized intelligence
* Reactive instead of proactive governance

Traditional surveillance systems only record incidents.

SmartVieew AI enables authorities to **understand, prioritize, and respond** to incidents in real time.

---

# 💡 Solution

SmartVieew AI introduces an intelligent AI layer between surveillance infrastructure and decision-makers.

```
CCTV Cameras
        │
        ▼
 Video Ingestion Layer
        │
        ▼
 AI Detection Layer
        │
        ▼
 Incident Generation
        │
        ▼
 Agentic AI Layer
        │
        ▼
 Smart Dashboard
        │
        ▼
 Authorities
```

---

# ✨ Core Features

## 🛡️ Public Safety Intelligence

* Weapon Detection
* Violence Detection
* Intrusion Detection
* Suspicious Activity Detection
* Threat Prioritization
* Incident Tracking

---

## 🚦 Traffic Intelligence *(Upcoming)*

* Accident Detection
* Traffic Density Analysis
* Wrong-way Vehicle Detection
* Emergency Route Suggestions
* Smart Traffic Analytics

---

## 🏙️ Civic Intelligence *(Upcoming)*

* Waste Overflow Detection
* Illegal Dumping Detection
* Water Leakage Monitoring
* Streetlight Failure Detection
* Infrastructure Health Monitoring

---

## 🚑 Emergency Intelligence *(Upcoming)*

* Fire Detection
* Disaster Alerts
* Emergency Coordination
* Incident Escalation

---

# 🤖 Agentic AI Architecture

SmartVieew AI uses specialized AI agents to automate decision-making.

### Detection Agent

Detects incidents from video streams using Computer Vision.

---

### Risk Assessment Agent

Evaluates:

* Threat severity
* Risk level
* Recommended actions

---

### Response Agent

Automatically recommends:

* Security actions
* Escalation path
* Responsible departments

---

### Report Generation Agent

Creates

* Incident summaries
* AI-generated reports
* Historical records

---

### Analytics Agent *(Upcoming)*

Generates

* Daily analytics
* Weekly reports
* Threat heatmaps
* Trend prediction

---

# ⚙️ System Workflow

```
Live Camera Feed
        │
        ▼
Object Detection (YOLOv11)
        │
        ▼
Incident Generation
        │
        ▼
Risk Assessment Agent
        │
        ▼
Response Recommendation
        │
        ▼
Incident Dashboard
        │
        ▼
Authority Response
```

---

# 🏗️ System Architecture

The platform consists of multiple layers:

* Video Ingestion Layer
* AI Detection Layer
* Agentic AI Layer
* Incident Management Layer
* Notification Layer
* Dashboard Layer
* Database Layer

---

# 🧠 Technology Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Shadcn UI

---

## Backend

* FastAPI
* Python
* Node.js

---

## AI & Machine Learning

* YOLOv11
* OpenCV
* PyTorch
* Gemini API *(Risk Assessment Agent)*
* LangChain *(Future)*

---

## Database

* PostgreSQL
* Redis

---

## Authentication

* Supabase Auth

---

## Cloud & Deployment

* Docker
* AWS
* Supabase

---

# 📁 Project Structure

```
SmartVieew-AI/

├── frontend/
├── backend/
├── agents/
│   ├── detection-agent/
│   ├── risk-agent/
│   ├── response-agent/
│   ├── report-agent/
│   └── analytics-agent/
│
├── ai-models/
├── database/
├── docs/
├── deployment/
└── README.md
```

---

# 🚀 Roadmap

## Phase 1 (Current)

* Weapon Detection
* Incident Dashboard
* Risk Assessment Agent
* Report Generation

---

## Phase 2

* Violence Detection
* Notification Agent
* Email & WhatsApp Alerts
* Real-time Streaming

---

## Phase 3

* Traffic Intelligence
* Civic Infrastructure Monitoring
* Heatmaps
* Analytics Dashboard

---

## Phase 4

* Smart Township Platform
* Multi-camera Support
* Edge AI
* Cloud Scaling

---

## Phase 5

* Smart City Operating System
* Autonomous Urban Intelligence
* Multi-agent Coordination
* Predictive City Analytics

---

# 📊 Business Model

* SaaS Subscription
* Per Camera Licensing
* Enterprise Plans
* Analytics Dashboard
* Government Smart City Solutions

---

# 🎯 Target Customers

* Universities
* Educational Campuses
* Hostels
* Residential Communities
* Business Parks
* Industrial Campuses
* Municipal Corporations
* Smart City Projects

---

# 🌟 Why SmartVieew AI?

Unlike conventional surveillance software, SmartVieew AI doesn't just detect events—it helps organizations **understand**, **prioritize**, and **respond**.

Our goal is to bridge the gap between passive monitoring and intelligent urban operations.

---

# 🔮 Future Scope

* Autonomous AI Agents
* Edge AI Deployment
* Smart Traffic Optimization
* Waste Management Intelligence
* Disaster Prediction
* Predictive Public Safety Analytics
* Digital Twin Integration
* Multi-City Deployment

---

# 👨‍💻 Team

### Team Leader

**Aviral Bajpai**

### Team Members

* Bhavya Tiwari
* Avtaar Kumar Singh
* Ayush Yadav

---

# 🏆 Built For

**Evolothon 1.0**

Innovation | AI | Smart Cities | Urban Intelligence | Digital Transformation

---

# 📜 License

This project is currently under active development.

Copyright © 2026 SmartVieew AI Team.

