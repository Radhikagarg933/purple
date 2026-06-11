# 🛍️ Store Intelligence Platform

AI-Powered Retail Analytics & Customer Behavior Intelligence System  
Transforming retail store data into actionable business insights through real-time analytics, customer behavior tracking, and intelligent visualization.

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

## 💡 Solution

The Store Intelligence Platform is an AI-powered retail analytics system that provides real-time visibility into store operations through interactive dashboards and advanced analytics.

It aggregates store events, customer sessions, and transaction data to generate actionable insights that help retailers improve engagement, increase conversions, and optimize store layouts.

---

## ✨ Key Features

### 📊 Real-Time Dashboard
- Visitors tracking  
- Entries & exits  
- Conversion rate  
- Dwell time analysis  
- Zone utilization  
- Store health status  

### 📈 Advanced Metrics Analytics
- Daily sales tracking  
- Orders processed  
- Active users monitoring  
- Weekly performance trends  
- System activity overview  

### 🔻 Conversion Funnel Analysis
Customer journey tracking:

Entry → Zone Visit → Dwell Time → Billing → Purchase  

Helps identify bottlenecks in conversion flow.

### 🔥 Heatmap Analytics
- High traffic zones  
- Customer movement patterns  
- Popular product areas  
- Underutilized store sections  

### ⚠️ Anomaly Detection
- Traffic spikes detection  
- Congestion alerts  
- Abnormal behavior tracking  
- Operational irregularities  

---

## 🏗️ System Architecture

```bash
Data Sources (Events / Transactions / Sessions)
        ↓
Data Ingestion Layer
        ↓
Analytics Services
    ├── Metrics Engine
    ├── Funnel Engine
    ├── Heatmap Engine
    └── Anomaly Engine
        ↓
FastAPI Backend
        ↓
React Dashboard
```
---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Vite  
- Tailwind CSS  
- Recharts  
- Axios  
- Lucide React  

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

```bash
app/
├── core/
│   ├── config.py
│   ├── exceptions.py
│   └── logging.py
│
├── db/
│   ├── database.py
│   ├── models.py
│   └── seed.py
│
├── repositories/
│   ├── event_repository.py
│   ├── session_repository.py
│   └── transaction_repository.py
│
├── routers/
│   ├── events.py
│   ├── stores.py
│   └── health.py
│
├── schemas/
│   ├── metrics.py
│   ├── funnel.py
│   ├── heatmap.py
│   ├── anomaly.py
│   ├── event.py
│   └── health.py
│
├── services/
│   ├── metrics_service.py
│   ├── funnel_service.py
│   ├── heatmap_service.py
│   ├── anomaly_service.py
│   ├── ingestion_service.py
│   └── pos_service.py

dashboard/
backend/
pipeline/
sql/
test/
docs/
```

# 🛍️ Store Intelligence Platform

## 📊 AI-Powered Retail Analytics System  
Transforming retail store data into actionable insights through real-time analytics, customer behavior tracking, and intelligent visualization.

---

## 📡 API Endpoints

| Endpoint | Description |
|----------|-------------|
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
[🔗 Clone Repository](https://github.com/Radhikagarg933/purple.git)



### 🎥 Demo Video
[Watch Demo Video](https://youtu.be/MCsMq2lfEl0?si=zNSbVmG4JeSm-DEEcd)
---

## 🚀 How to Run the Project
```bash

### 1️⃣ Clone the Repository
git clone https://github.com/Radhikagarg933/purple.git
cd purple

---

### 2️⃣ Setup Backend
pip install -r requirements.txt
uvicorn app.main:app --reload

Backend will run at:
http://localhost:8000

---

### 3️⃣ Setup Frontend
cd dashboard
npm install
npm run dev

Frontend will run at:
http://localhost:5173

---

### 4️⃣ Run with Docker (Optional)
docker-compose up --build
```

---

## 📊 Business Impact

- Improve conversion rates  
- Optimize store layout  
- Understand customer behavior  
- Increase operational efficiency  
- Detect issues in real time  
- Enable data-driven decisions  

---

## 🔮 Future Enhancements

- Multi-store analytics  
- AI-based sales forecasting  
- Recommendation engine  
- Queue detection system  
- Customer segmentation  
- Mobile application  
- Cloud deployment  
