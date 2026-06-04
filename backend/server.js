const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ---------- HEALTH CHECK ----------
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ---------- METRICS ----------
app.get("/stores/:storeId/metrics", (req, res) => {
  const { storeId } = req.params;

  res.json({
    storeId,
    unique_visitors: 1200,
    entries: 800,
    exits: 300
  });
});

// ---------- FUNNEL ----------
app.get("/stores/:storeId/funnel", (req, res) => {
  const { storeId } = req.params;

  res.json({
    storeId,
    funnel: [
      { stage: "Visit", value: 1000 },
      { stage: "Product View", value: 600 },
      { stage: "Add to Cart", value: 300 },
      { stage: "Purchase", value: 120 }
    ]
  });
});

// ---------- HEATMAP ----------
app.get("/stores/:storeId/heatmap", (req, res) => {
  const { storeId } = req.params;

  res.json({
    storeId,
    heatmap: [
      { hour: "10AM", value: 20 },
      { hour: "11AM", value: 50 },
      { hour: "12PM", value: 80 },
      { hour: "1PM", value: 40 }
    ]
  });
});

// ---------- ANOMALIES ----------
app.get("/stores/:storeId/anomalies", (req, res) => {
  const { storeId } = req.params;

  res.json({
    storeId,
    anomalies: [
      {
        id: 1,
        type: "Traffic Spike",
        severity: "high",
        message: "Sudden increase in visitors detected"
      },
      {
        id: 2,
        type: "Drop in Sales",
        severity: "medium",
        message: "Sales dropped compared to yesterday"
      }
    ]
  });
});

// ---------- START SERVER ----------
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});