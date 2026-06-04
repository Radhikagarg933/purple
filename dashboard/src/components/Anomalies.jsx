import { useEffect, useState } from "react";
import api from "../services/api";

export default function Anomalies({ storeId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get(`/stores/${storeId}/anomalies`)
      .then((res) => setData(res.data.anomalies || []))
      .catch(() => setData([]));
  }, [storeId]);

  const getColor = (severity) => {
    if (severity === "high") return "#ef4444";
    if (severity === "medium") return "#f59e0b";
    return "#22c55e";
  };

  return (
    <div
      style={{
        background: "#111827",
        padding: "15px",
        borderRadius: "12px",
        border: "1px solid #1f2937",
        maxHeight: "220px",
        overflowY: "auto",
      }}
    >
      <h3 style={{ marginBottom: "12px" }}>
        Active Anomalies
      </h3>

      {data.length === 0 && (
        <div
          style={{
            padding: "12px",
            background: "#0b1220",
            borderRadius: "8px",
          }}
        >
          No anomalies detected
        </div>
      )}

      {data.map((a) => (
        <div
          key={a.id}
          style={{
            marginBottom: "10px",
            padding: "12px",
            borderLeft: `4px solid ${getColor(a.severity)}`,
            background: "#0b1220",
            borderRadius: "8px",
          }}
        >
          <strong>{a.type}</strong>
          <div style={{ marginTop: "5px", color: "#cbd5e1" }}>
            {a.message}
          </div>
        </div>
      ))}
    </div>
  );
}