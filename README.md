# Store Intelligence

AI-powered retail analytics system.

## Features

- Visitor Counting
- Entry / Exit Detection
- Re-entry Detection
- Queue Detection
- Zone Analytics
- Heatmaps
- Funnel Analysis
- Anomaly Detection

## Run

```bash
docker compose up --build
```

API:

```bash
http://localhost:8000/docs
```

Dashboard:

```bash
npm install
npm run dev
```

## Pipeline

```text
Video
 ↓
YOLO
 ↓
ByteTrack
 ↓
Events
 ↓
API
 ↓
Dashboard
```