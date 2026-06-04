# 🛍️ Store Intelligence Platform
### AI-Powered Retail Analytics & Customer Behavior Intelligence System

> Transforming retail store data into actionable business insights through real-time analytics, customer behavior tracking, and intelligent visualization.

---

## 🚀 Problem Statement

Retail stores generate large volumes of operational data through customer visits, transactions, and in-store activities. However, most businesses lack a unified platform to understand:

- Customer footfall patterns
- Conversion rates
- High-performing store zones
- Customer dwell time
- Purchase behavior
- Operational anomalies

Without data-driven insights, optimizing store performance becomes challenging.

---

## 💡 Our Solution

Store Intelligence Platform is an AI-powered retail analytics system that provides real-time visibility into store operations through interactive dashboards and advanced analytics.

The platform aggregates store events, customer sessions, and transaction data to generate actionable insights that help retailers improve customer engagement, increase conversions, and optimize store layouts.

---

## ✨ Key Features

### 📊 Real-Time Dashboard

Monitor store performance through:

- Visitors
- Entries & Exits
- Conversion Rate
- Dwell Time
- Zone Utilization
- Store Health Status

---

### 📈 Advanced Metrics Analytics

Track important business KPIs:

- Daily Sales
- Orders Processed
- Active Users
- Weekly Performance Trends
- Customer Activity
- System Monitoring

---

### 🔻 Conversion Funnel Analysis

Analyze customer journeys:

Entry → Zone Visit → Dwell Time → Billing → Purchase

Identify bottlenecks and improve conversion rates.

---

### 🔥 Heatmap Analytics

Visualize customer engagement through:

- High Traffic Zones
- Customer Movement Patterns
- Popular Product Areas
- Underutilized Store Sections

---

### ⚠️ Anomaly Detection

Automatically identify:

- Unusual Traffic Spikes
- Congestion Events
- Abnormal Customer Behavior
- Operational Irregularities

---

## 🏗️ System Architecture

Data Sources (Events / Transactions / Sessions)
        │
        ▼
 Data Ingestion Layer
        │
        ▼
 Analytics Services
 ├── Metrics Engine
 ├── Funnel Engine
 ├── Heatmap Engine
 └── Anomaly Engine
        │
        ▼
 FastAPI Backend
        │
        ▼
 React Dashboard

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Recharts
- Axios
- Lucide React Icons

### Backend

- FastAPI
- Python 3.11+
- Pydantic
- SQLAlchemy
- Uvicorn

### Database

- PostgreSQL
- SQLite (Development)

### Data Processing

- Pandas
- NumPy

### DevOps

- Docker
- Docker Compose
- GitHub Actions

---

## 📂 Project Structure

```text
PURPLE PROJECT
│
├── .github/
│
├── app/
│   ├── core/
│   │   ├── config.py
│   │   ├── exceptions.py
│   │   └── logging.py
│   │
│   ├── db/
│   │   ├── database.py
│   │   ├── models.py
│   │   └── seed.py
│   │
│   ├── repositories/
│   │   ├── event_repository.py
│   │   ├── session_repository.py
│   │   └── transaction_repository.py
│   │
│   ├── routers/
│   │   ├── events.py
│   │   ├── stores.py
│   │   └── health.py
│   │
│   ├── schemas/
│   │   ├── metrics.py
│   │   ├── funnel.py
│   │   ├── heatmap.py
│   │   ├── anomaly.py
│   │   ├── event.py
│   │   └── health.py
│   │
│   ├── services/
│   │   ├── metrics_service.py
│   │   ├── funnel_service.py
│   │   ├── heatmap_service.py
│   │   ├── anomaly_service.py
│   │   ├── ingestion_service.py
│   │   └── pos_service.py
│
├── backend/
├── dashboard/
├── pipeline/
├── data/
├── docs/
├── sql/
├── test/
│
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── README.md
```

---

## 📡 API Endpoints

| Endpoint | Description |
|-----------|------------|
| GET /health | Service Health Check |
| GET /stores | Retrieve Store Information |
| GET /events | Event Stream |
| GET /stores/{id}/metrics | Store Metrics |
| GET /stores/{id}/funnel | Funnel Analytics |
| GET /stores/{id}/heatmap | Heatmap Data |
| GET /stores/{id}/anomalies | Detected Anomalies |

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/your-username/store-intelligence-platform.git

cd store-intelligence-platform
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Backend

```bash
uvicorn app.main:app --reload
```

Backend will run at:

```text
http://localhost:8000
```

### Run Frontend

```bash
cd dashboard

npm install

npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

### Run Using Docker

```bash
docker-compose up --build
```

---

## 📊 Business Impact

The platform helps retailers:

✅ Improve Conversion Rates

✅ Optimize Store Layouts

✅ Understand Customer Behavior

✅ Increase Operational Efficiency

✅ Detect Issues in Real Time

✅ Make Data-Driven Decisions

---

## 🔮 Future Enhancements

- Multi-Store Analytics
- AI-Based Sales Forecasting
- Recommendation Engine
- Queue Detection
- Customer Segmentation
- Mobile Application
- Cloud Deployment

---

## 🏆 Hackathon Submission

Purplle Tech Challenge 2026

Store Intelligence Platform is a scalable retail analytics solution that empowers businesses with real-time operational visibility, customer behavior insights, and data-driven decision-making capabilities.

---



---

