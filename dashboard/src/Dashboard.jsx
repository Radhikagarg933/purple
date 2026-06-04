import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer
} from "recharts";

export default function App() {
  const [activeTab, setActiveTab] = useState("metrics");

  const trafficData = [
    { name: "Mon", visitors: 120 },
    { name: "Tue", visitors: 210 },
    { name: "Wed", visitors: 180 },
    { name: "Thu", visitors: 260 },
    { name: "Fri", visitors: 300 },
    { name: "Sat", visitors: 400 },
    { name: "Sun", visitors: 320 }
  ];

  const funnelData = [
    { stage: "Visited", value: 1000 },
    { stage: "Added", value: 600 },
    { stage: "Purchased", value: 300 }
  ];

  const pieData = [
    { name: "Mobile", value: 55 },
    { name: "Desktop", value: 35 },
    { name: "Tablet", value: 10 }
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

  return (
    <div style={styles.app}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        {["metrics", "funnel", "heatmap", "anomalies"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...styles.btn,
              background: activeTab === tab ? "#3b82f6" : "#1f2937"
            }}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* DASHBOARD */}
      <div style={styles.dashboard}>
        <h1 style={styles.title}>{activeTab.toUpperCase()}</h1>

        {/* METRICS */}
        {activeTab === "metrics" && (
          <>
            <div style={styles.grid}>
              <div style={styles.card}>👥 Visitors: 1284</div>
              <div style={styles.card}>🚪 Entries: 830</div>
              <div style={styles.card}>🚶 Exits: 321</div>
              <div style={{ ...styles.card, border: "1px solid #3b82f6" }}>
                📈 Conversion: 64.9%
              </div>
            </div>

            <div style={styles.cardFull}>
              <h3>📈 Weekly Traffic</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="visitors" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* FUNNEL */}
        {activeTab === "funnel" && (
          <div style={styles.cardFull}>
            <h3>📊 Funnel Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={funnelData}>
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* HEATMAP */}
        {activeTab === "heatmap" && (
          <div style={styles.cardFull}>
            <h3>🔥 Device Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" label outerRadius={120}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* ANOMALIES */}
        {activeTab === "anomalies" && (
          <div style={{ ...styles.cardFull, border: "1px solid red" }}>
            <h3>🚨 Live Anomalies</h3>
            <ul>
              <li>⚠️ Traffic spike detected at 2PM</li>
              <li>⚠️ Sales drop in Zone B</li>
              <li>⚠️ Camera offline at Gate 2</li>
              <li>⚠️ Checkout delay anomaly detected</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

/* ===================== STYLES ===================== */

const styles = {
  app: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    background: "#0b0f1a",
    color: "white",
    fontFamily: "Arial"
  },

  sidebar: {
    width: "220px",
    background: "#111827",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    gap: "10px"
  },

  btn: {
    padding: "12px",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer"
  },

  dashboard: {
    flex: 1,
    padding: "20px",
    overflow: "hidden"
  },

  title: {
    fontSize: "28px",
    marginBottom: "20px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px"
  },

  card: {
    background: "#1f2937",
    padding: "20px",
    borderRadius: "12px"
  },

  cardFull: {
    marginTop: "20px",
    background: "#1f2937",
    padding: "20px",
    borderRadius: "12px"
  }
};