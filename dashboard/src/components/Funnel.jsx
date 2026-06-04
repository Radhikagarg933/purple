import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

export default function Funnel() {
  const [selected, setSelected] = useState(null);

  const data = [
    { stage: "Visit", value: 1000 },
    { stage: "Product View", value: 600 },
    { stage: "Add to Cart", value: 300 },
    { stage: "Purchase", value: 120 },
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
      <h3 style={{ marginBottom: "10px" }}>
        Conversion Funnel
      </h3>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="stage" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="#3b82f6"
            onClick={(data) => setSelected(data)}
          />
        </BarChart>
      </ResponsiveContainer>

      {selected && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#0b1220",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        >
          <b>{selected.stage}</b>
          <br />
          Value: {selected.value}
        </div>
      )}
    </div>
  );
}