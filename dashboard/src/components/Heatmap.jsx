import { useState } from "react";

export default function Heatmap() {
  const [active, setActive] = useState(null);

  const zones = [
    { name: "Entrance", value: 90 },
    { name: "Electronics", value: 60 },
    { name: "Clothing", value: 40 },
    { name: "Billing", value: 70 },
  ];

  return (
    <div
      style={{
        background: "#111827",
        padding: "15px",
        borderRadius: "12px",
        border: "1px solid #1f2937",
        height: "100%",
      }}
    >
      <h3 style={{ marginBottom: "15px" }}>
        Store Heatmap
      </h3>

      {zones.map((zone, index) => (
        <div
          key={index}
          onClick={() => setActive(zone)}
          style={{
            marginBottom: "12px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "5px",
            }}
          >
            <span>{zone.name}</span>
            <span>{zone.value}%</span>
          </div>

          <div
            style={{
              width: "100%",
              height: "12px",
              background: "#1e293b",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${zone.value}%`,
                height: "100%",
                background:
                  zone.value > 80
                    ? "#ef4444"
                    : zone.value > 60
                    ? "#f59e0b"
                    : "#3b82f6",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
      ))}

      {active && (
        <div
          style={{
            marginTop: "15px",
            padding: "12px",
            background: "#0b1220",
            borderRadius: "8px",
            border: "1px solid #334155",
          }}
        >
          <strong>{active.name}</strong>
          <br />
          Traffic Density: {active.value}%
        </div>
      )}
    </div>
  );
}